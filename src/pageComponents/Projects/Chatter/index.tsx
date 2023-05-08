import { EnumConnectionStatus } from "@/components/pusher/type/ConnectionStatus"
import { usePresencePusher } from "@/components/pusher/usePresencePusher"
import VideoChat, { VideoStreamHandler } from "@/components/VideoChat"
import { useCallback, useRef, useState } from "react"
import styles from "./Chatter.module.css"
import ChatterForm from "./ChatterForm"
import RecipientList, { Recipient } from "./RecipientList"
import { useWebRtc } from "./useWebRtc"

interface Props {
  appKey: string
  cluster: string
}

const Chatter = ({ appKey, cluster }: Props) => {
  const [recordingStarted, setRecordingStarted] = useState(false)
  const [stream, setStream] = useState<MediaStream>()
  const remoteVideoRef = useRef<VideoStreamHandler>(null)

  const alertError = useCallback((exception: unknown) => {
    alert(exception)
  }, [])

  const setWebRtcRemoteStream = useCallback((mediaStream: MediaStream) => {
    if (remoteVideoRef.current !== null) {
      remoteVideoRef.current.stream(mediaStream)
    } else {
      alert("No stream")
    }
  }, [])

  const webRtcErrorCallback = useCallback(
    (errorMessage: string) => {
      alertError(errorMessage)
    },
    [alertError]
  )

  const {
    initialize: initializeWebRtc,
    createOffer,
    answerCall,
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
          alert("User unable to connect, try with a new name")
        case EnumConnectionStatus.Disconnected:
          setRecordingStarted(false)
          setStream(undefined)
          disconnectWebRtc()
          remoteVideoRef.current?.stopStream()
          break
      }
    },
    [disconnectWebRtc]
  )

  const { connect, disconnect, onlineUsers, bind, trigger, myId } =
    usePresencePusher({
      appKey,
      cluster,
      authEndpoint: "/api/pusherauth",
      updateConnectionCallback,
    })

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

        bind<{ room: string; sdp: RTCSessionDescriptionInit }>(
          "client-answer",
          (answer) => {
            if (answer.room === myId) answerCall(answer.sdp)
          }
        )

        bind<{ room: string; from: string; sdp: RTCSessionDescriptionInit }>(
          "client-sdp",
          (msg) => {
            if (msg.room === myId) {
              const answer = confirm(
                "You have a call from: " +
                  msg.from +
                  ". Would you like to answer?"
              )
              if (!answer) {
                return trigger("client-reject", {
                  room: msg.room,
                  rejected: myId,
                })
              } else {
                createAnswer(msg.sdp, (sdp) => {
                  trigger("client-answer", {
                    sdp: sdp,
                    room: msg.from,
                  })
                })
              }
            }
          }
        )
      }
    },
    [answerCall, bind, createAnswer, initializeWebRtc, myId, stream, trigger]
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
      bind<{ room: string; candidate: RTCIceCandidate }>(
        "client-candidate",
        (msg) => {
          if (msg.room === room) addIceCandidate(msg.candidate)
        }
      )

      bind<{ room: string; from: string }>("client-reject", (answer) => {
        if (answer.room === room)
          alert("call to " + answer.from + " was politely declined")
      })

      createOffer((desc) => {
        trigger("client-sdp", {
          sdp: desc,
          room,
        })
      })
    },
    [addIceCandidate, bind, createOffer, trigger]
  )

  return (
    <div className={styles.container}>
      <div className={styles.videoContainer}>
        <VideoChat
          id="host-video"
          muted={true}
          record={recordingStarted}
          videoTracksCallback={localVideoTracksCallback}
          videoFailedCallback={alertError}
        ></VideoChat>
        <VideoChat
          id="remote-video"
          muted={false}
          record={false}
          ref={remoteVideoRef}
          videoTracksCallback={() => {}}
          videoFailedCallback={(exception) => alert(exception)}
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
