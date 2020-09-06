`use strict`

import * as React from "react";

interface IVideo {
  src: string;
  imgSrc: string;
  imgAlt: string;
  width?: number;
  height?: number;
  preload?: string;
}

const Video:React.FC<IVideo> = ({src, imgSrc, imgAlt, width, height, preload}) => {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [sound, setSound] = React.useState(false);
  const [isPlaying, setPlaying] = React.useState(false);

  const _toggleSound = () => {
    if(videoRef.current !== null) {
      const _sound = !sound;
      setSound(_sound)
      videoRef.current.muted=!_sound;
    }
  }

  const _hoverVideo = () => {
    if(videoRef.current !== null) {
      videoRef.current.style.opacity = "1";
      videoRef.current.play();
      setPlaying(true);
    }
  }

  const _hideVideo = () => {
    if(videoRef.current !== null) {
      videoRef.current.style.opacity = "0";
      videoRef.current.pause();
      setPlaying(false);
    }
  }

  const _toggleSoundAndPlay = () => {
    if(videoRef.current !== null) {
      if(isPlaying && !videoRef.current.muted) {
        _hideVideo()
      }
      else {
        _hoverVideo()
        if(videoRef.current.muted) {
          _toggleSound()
        }
      }
    }
  }

  return (
    <>
      <div className="container-btn">
        <button onClick={_toggleSound}>with sound ( {sound?"on":"off"} <i className={`fas ${sound?"fa-volume-up":"fa-volume-mute"}`}></i> )</button>
      </div>
      <div className="container-video"
        onClick={_toggleSoundAndPlay}
        onMouseOver={_hoverVideo}
        onMouseOut={_hideVideo}>
        <img src={imgSrc} alt={imgAlt} />
        <div className="overlay"><i className="fas fa-play-circle"></i></div>
        <video
          width={width?width:360}
          height={height?height:640}
          loop
          muted
          preload={preload?preload:"auto"}
          ref={videoRef}
          >
          <source src={src} type="video/mp4" />
          Your browser does not support MP4 videos
        </video>
      </div>
      <style jsx>{`
        .container-btn {
          text-align: center;
        }
        .container-btn > button {
          background: none;
          color: #FFF;
          outline: none;
          box-shadow: none;
          user-select: none;
          border: none;
          cursor: pointer;
          padding: 0.5rem;
        }
        .overlay {
          position: absolute;
          color: #FFF;
          top: 3rem;
          opacity: 0.5;
          left: calc(50% - 2.5rem);
          font-size: 5rem;
        }
        .container-video {
          cursor: pointer;
          user-select: none;
          position: relative;
          border: 1px solid;
        }
        .container-video > img {
          width: ${width?width:360}px;
          height: ${height?height:640}px;
          display: block;
        }
        .container-video > video {
          opacity: 0;
          transition: opacity 1s;
          position: absolute;
          top: 0;
          left: 0;
        }
        :global(video::-webkit-media-controls) {
            display:none !important;
        }
      `}</style>
    </>
  )
}

export default Video;
