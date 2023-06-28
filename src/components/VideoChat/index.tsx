import {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react"
import styles from "./VideoChat.module.css"

type Props = {
  id: string
  record: boolean
  muted: boolean
  videoFailedCallback: (exception: unknown) => void
  videoTracksCallback: (mediaStream: MediaStream | undefined) => void
}

export interface VideoStreamHandler {
  stream: (stream: MediaStream) => void
  stopStream: () => void
}

const VideoChat = forwardRef<VideoStreamHandler, Props>(
  function VideoWithStreamHandler(
    { id, record, muted, videoFailedCallback, videoTracksCallback }: Props,
    ref
  ) {
    const videoRef = useRef<HTMLVideoElement>(null)
    const streamRef = useRef<MediaStream>()

    const stream = useCallback((stream: MediaStream) => {
      if (videoRef.current !== null) {
        videoRef.current.srcObject = stream
      }
    }, [])

    const stopStream = useCallback(() => {
      if (videoRef.current !== null) {
        videoRef.current.srcObject = null
      }
    }, [])

    useImperativeHandle(ref, () => {
      return {
        stream,
        stopStream,
      }
    })

    const gotStream = useCallback(
      (stream: MediaStream) => {
        if (videoRef.current !== null) {
          videoRef.current.srcObject = stream
          streamRef.current = stream
          videoTracksCallback(stream)
        }
      },
      [videoTracksCallback]
    )

    const startVideo = useCallback(async () => {
      try {
        const videoStream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: true,
        })
        gotStream(videoStream)
      } catch (exception) {
        videoFailedCallback(exception)
      }
    }, [gotStream, videoFailedCallback])

    const stopVideo = useCallback(() => {
      if (streamRef.current && streamRef.current?.getTracks) {
        streamRef.current.getTracks().forEach((track) => {
          track.stop() //Comment - make sure Chrome browsers tab has no red icon/speaker when stopped
        })
        streamRef.current = undefined
      }
      if (videoRef.current !== null) {
        videoRef.current.srcObject = null
        videoTracksCallback(undefined)
      }
    }, [videoTracksCallback])

    useEffect(() => {
      if (record) {
        queueMicrotask(startVideo)
      } else {
        queueMicrotask(stopVideo)
      }
      return () => {
        queueMicrotask(stopVideo)
      }
    }, [startVideo, stopVideo, record])

    return (
      // eslint-disable-next-line jsx-a11y/media-has-caption
      <video
        ref={videoRef}
        id={id}
        autoPlay
        muted={muted}
        playsInline
        data-testid={"video-chat"}
        className={styles.container}
      ></video>
    )
  }
)

const VideoComparator = (prevProps: Props, nextProps: Props) =>
  prevProps.record === nextProps.record

export default memo(VideoChat, VideoComparator)
