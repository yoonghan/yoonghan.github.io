import * as React from "react"
import styles from "./Video.module.css"

interface Props {
  src: string
  imgJpgSrc: string
  imgWebpSrc: string
  imgAlt: string
  preload?: string
  noRef?: boolean
}

const Video = ({
  src,
  imgJpgSrc,
  imgWebpSrc,
  imgAlt,
  preload,
  noRef,
}: Props) => {
  const videoRef = React.useRef<HTMLVideoElement>(null)
  const [sound, setSound] = React.useState(false)
  const [isPlaying, setPlaying] = React.useState(false)

  const toggleSound = () => {
    if (videoRef.current !== null) {
      videoRef.current.muted = sound
      setSound(!sound)
    }
  }

  const hoverVideo = () => {
    if (videoRef.current !== null) {
      videoRef.current.style.opacity = "1"
      videoRef.current.play()
      setPlaying(true)
    }
  }

  const hideVideo = () => {
    if (videoRef.current !== null) {
      videoRef.current.style.opacity = "0"
      videoRef.current.pause()
      setPlaying(false)
    }
  }

  const toggleSoundAndPlay = () => {
    if (videoRef.current !== null) {
      if (isPlaying && !videoRef.current.muted) {
        hideVideo()
      } else {
        hoverVideo()
        if (videoRef.current.muted) {
          toggleSound()
        }
      }
    }
  }

  return (
    <>
      <div className={styles["container-btn"]}>
        <button onClick={toggleSound}>
          with sound ( <span>{sound ? "on" : "off"}</span>{" "}
          <i className={`fas ${sound ? "fa-volume-up" : "fa-volume-mute"}`}></i>{" "}
          )
        </button>
      </div>
      <div
        className={styles["container-video"]}
        onClick={toggleSoundAndPlay}
        onMouseOver={hoverVideo}
        onBlur={hoverVideo}
        onMouseOut={hideVideo}
        onFocus={hoverVideo}
        aria-hidden="true"
      >
        <picture>
          <source srcSet={imgWebpSrc} type="image/webp" />
          <source srcSet={imgJpgSrc} type="image/jpg" />
          <img src={imgJpgSrc} alt={imgAlt} width="756" height="1008" />
        </picture>
        <div className={styles.overlay}>
          <i className="fas fa-play-circle"></i>
        </div>
        <video
          loop
          muted
          preload={preload ?? "auto"}
          ref={noRef ? null : videoRef}
          data-testid={"video"}
        >
          <source src={src} type="video/mp4" />
          Your browser does not support MP4 videos
        </video>
      </div>
    </>
  )
}

export default Video
