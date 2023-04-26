import Button from "@/components/Button"
import VideoChat, { VideoStreamHandler } from "@/components/VideoChat"
import { useCallback, useRef, useState } from "react"
import styles from "./Chatter.module.css"
import { useWebRtc } from "./useWebRtc"

const Chatter = () => {
  const [videoStarted, setVideoStarted] = useState(false)
  const [remoteStarted, setRemoteStarted] = useState(false)
  const [stream, setStream] = useState<MediaStream>()
  const remoteVideoRef = useRef<VideoStreamHandler>(null)

  const setRemoteStream = useCallback(
    (e: RTCTrackEvent) => {
      if (stream && remoteVideoRef.current !== null) {
        remoteVideoRef.current.stream(stream)
      }
    },
    [stream]
  )

  const { callVideo } = useWebRtc(setRemoteStream)

  const localVideoTracksCallback = useCallback(
    (mediaStream: MediaStream | undefined) => {
      if (mediaStream) {
        setStream(mediaStream)
      }
    },
    []
  )

  const startStopVideo = useCallback(() => {
    setStream(undefined)
    setVideoStarted(!videoStarted)
    setRemoteStarted(false)
  }, [videoStarted])

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

      <div>
        <Button
          onClick={startStopVideo}
          additionalProps={{
            disabled: videoStarted && stream == undefined,
          }}
        >
          {videoStarted ? "Stop" : "Start"}
        </Button>
        <Button
          onClick={startStopRemoteVideo}
          additionalProps={{
            disabled:
              remoteStarted ||
              !videoStarted ||
              (videoStarted && stream == undefined),
          }}
        >
          Call
        </Button>
      </div>
    </div>
  )
}

export default Chatter
