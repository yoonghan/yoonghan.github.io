import Button from "@/components/Button"
import { usePresencePusher } from "@/components/pusher/usePresencePusher"
import VideoChat, { VideoStreamHandler } from "@/components/VideoChat"
import { useCallback, useRef, useState } from "react"
import styles from "./Chatter.module.css"
import ChatterForm from "./ChatterForm"
import { useWebRtc } from "./useWebRtc"

interface Props {
  appKey: string
  cluster: string
}

const Chatter = ({ appKey, cluster }: Props) => {
  const [videoStarted, setVideoStarted] = useState(false)
  const [remoteStarted, setRemoteStarted] = useState(false)
  const [stream, setStream] = useState<MediaStream>()
  const remoteVideoRef = useRef<VideoStreamHandler>(null)

  const setRemoteStream = useCallback((e: RTCTrackEvent) => {
    if (remoteVideoRef.current !== null && (e.streams || e.track)) {
      const inboundStream = new MediaStream()
      remoteVideoRef.current.stream(inboundStream)
      inboundStream.addTrack(e.track)
    } else {
      alert("No stream")
    }
  }, [])

  const { callVideo } = useWebRtc(setRemoteStream)
  const { connect } = usePresencePusher({
    appKey,
    cluster,
    authEndpoint: "/api/pusherauth",
    updateConnectionCallback: () => {},
  })

  const localVideoTracksCallback = useCallback(
    (mediaStream: MediaStream | undefined) => {
      if (mediaStream) {
        setStream(mediaStream)
      }
    },
    []
  )

  const startStopVideo = useCallback(
    (username: string) => {
      connect(username.toLocaleLowerCase())
      setStream(undefined)
      setVideoStarted(!videoStarted)
      setRemoteStarted(false)
    },
    [connect, videoStarted]
  )

  const startStopRemoteVideo = useCallback(() => {
    if (stream) {
      callVideo(stream)
      setRemoteStarted(true)
    }
  }, [callVideo, stream])

  const alertError = useCallback((exception: unknown) => {
    setVideoStarted(false)
    alert(exception)
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.videoContainer}>
        <VideoChat
          id="host-video"
          muted={true}
          play={videoStarted}
          videoTracksCallback={localVideoTracksCallback}
          videoFailedCallback={alertError}
        ></VideoChat>
        <VideoChat
          id="remote-video"
          muted={false}
          play={false}
          ref={remoteVideoRef}
          videoTracksCallback={() => {}}
          videoFailedCallback={(exception) => alert(exception)}
        ></VideoChat>
      </div>
      <hr />
      <ChatterForm
        startStopSenderVideo={startStopVideo}
        startStopCallerVideo={startStopRemoteVideo}
        senderButtonCanStop={videoStarted}
        senderButtonDisabled={videoStarted && stream == undefined}
        callerButtonDisabled={remoteStarted}
      />
    </div>
  )
}

export default Chatter
