import AlertDialog, {
  Props as AlertProps,
} from "@/components/Dialog/AlertDialog"
import ConfirmationDialog, {
  Props as ConfirmationProps,
} from "@/components/Dialog/ConfirmationDialog"
import { useDialogCreation } from "@/components/Dialog/useDialogCreation/useDialogCreation"
import { EnumConnectionStatus } from "@/components/pusher/type/ConnectionStatus"
import { Member } from "@/components/pusher/type/Member"
import {
  Presence,
  usePresencePusher,
} from "@/components/pusher/usePresencePusher"
import VideoChat, { VideoStreamHandler } from "@/components/VideoChat"
import { useCallback, useRef, useState } from "react"
import styles from "./Chatter.module.css"
import ChatterForm from "./ChatterForm"
import RecipientList, { Recipient } from "./RecipientList"
import { useWebRtc } from "../../../components/webrtc/useWebRtc"

interface Props {
  appKey: string
  cluster: string
}

const Chatter = ({ appKey, cluster }: Props) => {
  const [recordingStarted, setRecordingStarted] = useState(false)
  const [stream, setStream] = useState<MediaStream>()
  const remoteVideoRef = useRef<VideoStreamHandler>(null)
  const connectedUser = useRef("")
  const promptMessageDialog = useDialogCreation<AlertProps>(AlertDialog)
  const promptConfirmDialog =
    useDialogCreation<ConfirmationProps>(ConfirmationDialog)

  const promptMessage = useCallback(
    (exception: unknown | string) => {
      promptMessageDialog({
        title: "Alert",
        message: `${exception}`,
        onOk: () => {},
      })
    },
    [promptMessageDialog]
  )

  const setWebRtcRemoteStream = useCallback(
    (mediaStream: MediaStream) => {
      if (remoteVideoRef.current !== null) {
        remoteVideoRef.current.stream(mediaStream)
      } else {
        promptMessage("No stream")
      }
    },
    [promptMessage]
  )

  const webRtcErrorCallback = useCallback(
    (errorMessage: string) => {
      promptMessage(errorMessage)
    },
    [promptMessage]
  )

  const {
    initialize: initializeWebRtc,
    createOffer,
    acknowledgeAnswer,
    createAnswer,
    addIceCandidate,
    disconnect: disconnectWebRtc,
  } = useWebRtc(setWebRtcRemoteStream, webRtcErrorCallback)

  const updateConnectionCallback = useCallback(
    (connection: EnumConnectionStatus) => {
      switch (connection) {
        case EnumConnectionStatus.Connected:
          setRecordingStarted(true)
          break
        case EnumConnectionStatus.Error:
          promptMessage("User unable to connect, try with a new name")
        case EnumConnectionStatus.Disconnected:
          setRecordingStarted(false)
          setStream(undefined)
          disconnectWebRtc()
          remoteVideoRef.current?.stopStream()
          break
      }
    },
    [disconnectWebRtc, promptMessage]
  )

  const shouldUpdatedOfflineUserEnd = useCallback(
    (user: Member) => {
      if (connectedUser.current === user.id) {
        promptMessage(`User (${user.info.name}) has left the chat`)
        return true
      }
      return false
    },
    [promptMessage]
  )

  const { connect, disconnect, onlineUsers, bind, trigger, myId } =
    usePresencePusher({
      appKey,
      cluster,
      authEndpoint: "/api/pusherauth",
      updateConnectionCallback,
      shouldUpdatedOfflineUserEnd,
    })

  type ClientCandidate = { room: string; candidate: RTCIceCandidate } & Presence
  type ClientReject = { room: string } & Presence
  type ClientAnswerAndSdp = {
    room: string
    sdp: RTCSessionDescriptionInit
  } & Presence

  const localVideoTracksCallback = useCallback(
    (mediaStream: MediaStream | undefined) => {
      if (mediaStream && stream === undefined) {
        setStream(mediaStream)
        initializeWebRtc(mediaStream, (eventCandidate) => {
          trigger("client-candidate", {
            candidate: eventCandidate,
            room: myId,
          })
        })

        bind<ClientAnswerAndSdp>("client-answer", (answer) => {
          if (answer.room === myId) {
            connectedUser.current = answer.from
            acknowledgeAnswer(answer.sdp)
          }
        })

        bind<ClientAnswerAndSdp>("client-sdp", async (msg) => {
          if (msg.room === myId) {
            let answer = await new Promise((resolve, reject) => {
              promptConfirmDialog({
                title: "You got a call",
                message: `You have a call from (${msg.fromName}). Would you like to answer?`,
                onYesClick: () => {
                  resolve(true)
                },
                onNoClick: () => {
                  resolve(false)
                },
                onCancel: () => {
                  resolve(false)
                },
                isNotModal: true,
              })
            })

            if (!answer) {
              return trigger("client-reject", {
                room: msg.room,
                rejected: myId,
              })
            } else {
              createAnswer(msg.sdp, (sdp) => {
                connectedUser.current = msg.from
                trigger("client-answer", {
                  sdp: sdp,
                  room: msg.from,
                })
              })
            }
          }
        })
      }
    },
    [
      acknowledgeAnswer,
      bind,
      createAnswer,
      initializeWebRtc,
      myId,
      promptConfirmDialog,
      stream,
      trigger,
    ]
  )

  const startStopVideo = useCallback(
    (username: string) => {
      if (!recordingStarted) {
        connect(username.toLocaleLowerCase())
      } else {
        disconnect()
      }
    },
    [connect, disconnect, recordingStarted]
  )

  const callUser = useCallback(
    (recipient: Recipient) => {
      const room = recipient.id
      bind<ClientCandidate>("client-candidate", (msg) => {
        if (msg.room === room) {
          addIceCandidate(msg.candidate)
        }
      })

      bind<ClientReject>("client-reject", (answer) => {
        if (answer.room === room)
          promptMessage(`Call to ${answer.fromName} was politely declined`)
      })

      createOffer((desc) => {
        trigger("client-sdp", {
          sdp: desc,
          room,
        })
      })
    },
    [addIceCandidate, bind, createOffer, promptMessage, trigger]
  )

  return (
    <div className={styles.container}>
      <div className={styles.videoContainer}>
        <VideoChat
          id="host-video"
          muted={true}
          record={recordingStarted}
          videoTracksCallback={localVideoTracksCallback}
          videoFailedCallback={promptMessage}
        ></VideoChat>
        <VideoChat
          id="remote-video"
          muted={false}
          record={false}
          ref={remoteVideoRef}
          videoTracksCallback={() => {}}
          videoFailedCallback={promptMessage}
        ></VideoChat>
      </div>
      <h3>Idenfication</h3>
      <ChatterForm
        startStopSenderVideo={startStopVideo}
        senderButtonCanStop={recordingStarted}
        senderButtonDisabled={recordingStarted && stream == undefined}
      />
      <h3>List of online callers</h3>
      <RecipientList
        recipients={onlineUsers || []}
        recipientTriggered={callUser}
      />
    </div>
  )
}

export default Chatter
