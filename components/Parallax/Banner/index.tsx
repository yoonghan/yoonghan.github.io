`use strict`

import * as React from "react";
import {useRef, useEffect}  from "react";

interface IBanner {
  scrollContainer: React.RefObject<HTMLDivElement>;
}

const Banner:React.FC<IBanner> = ({scrollContainer}) => {
  const backgroundRef = useRef<HTMLDivElement>(null);
  const leftForegroundRef = useRef<HTMLDivElement>(null);
  const rightForegroundRef = useRef<HTMLDivElement>(null);
  const centerpieceTitleRef = useRef<HTMLDivElement>(null);
  const centerpieceDescRef = useRef<HTMLDivElement>(null);
  const parallaxDisplayContainerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  var parallaxDisplayContainerHeightSize = 0, parallaxDisplayContainerWidthSize = 0;
  const allowedDescToKickstart = 0.4;
  const allowedBackgroundScaledDistance = 5;

  const parallaxScrollForeground = (e:any) => {
    const pos = e.target.scrollTop;
    const targetHeight = e.target.offsetHeight;
    const opacityPercentage = (pos + (targetHeight / 2)) / parallaxDisplayContainerHeightSize;
    const adjustedPos = pos > parallaxDisplayContainerWidthSize ? parallaxDisplayContainerWidthSize:pos;
    var scaledPos = adjustedPos / 100;
    var translatePos = adjustedPos * 2;
    //var blurPos = adjustedPos / 10;

    if(leftForegroundRef.current !== null && rightForegroundRef.current !== null) {
      leftForegroundRef.current.style.transform = `scale(${1.0 + (scaledPos)}) translateX(-${translatePos}px)`;
      rightForegroundRef.current.style.transform = `scale(${1.0 + (scaledPos)}) translateX(${translatePos}px)`;
      // leftForegroundRef.current.style.filter = `blur(${blurPos}px)`;
      // rightForegroundRef.current.style.filter = `blur(${blurPos}px)`;
    }
    if(backgroundRef.current !== null) {
      backgroundRef.current.style.transform = `scale(${1.0 + (scaledPos/allowedBackgroundScaledDistance)})`
    }

    if(centerpieceTitleRef.current !== null) {
      centerpieceTitleRef.current.style.opacity = `${1 - opacityPercentage}`;
    }
    if(centerpieceDescRef.current !== null) {
      centerpieceDescRef.current.style.opacity = `${opacityPercentage - allowedDescToKickstart}`;
    }
    if(lineRef.current !== null) {
      lineRef.current.style.width = `${100 * opacityPercentage}px`;
    }
  }

  const refreshContainer = () => {
    if(parallaxDisplayContainerRef.current !== null) {
      parallaxDisplayContainerHeightSize = (parallaxDisplayContainerRef.current.clientHeight / 2);
      parallaxDisplayContainerWidthSize = (parallaxDisplayContainerRef.current.clientWidth / 3);
    }
  }

  useEffect(() => {
    if(scrollContainer.current !== null) {
      scrollContainer.current.addEventListener('scroll', parallaxScrollForeground);
    }

    refreshContainer();
    window.addEventListener('resize', refreshContainer);
    return () => {
      window.removeEventListener('resize', refreshContainer);
    }

    return () => {
      if(scrollContainer.current !== null) {
        scrollContainer.current.removeEventListener('scroll', parallaxScrollForeground);
      }
    }
  }, []);

  return (
    <div className="container" ref={parallaxDisplayContainerRef}>
      <div className="parallax-container">
        <div className="centerpiece" ref={centerpieceTitleRef}>Title</div>
        <div className="centerpiece inverse" ref={centerpieceDescRef}>
          <div>Description</div>
          <div className="horizontalbar" ref={lineRef}></div>
        </div>
        <div className="background" ref={backgroundRef}></div>
        <div className="foreground-left" ref={leftForegroundRef}>
        </div>
        <div className="foreground-right" ref={rightForegroundRef}>
        </div>
      </div>
      <style jsx>{`
        .container {
          width: 100vw;
          height: 330vh;
        }
        .parallax-container {
          position: sticky;
          height: 100vh;
          top: 0;
          display: flex;
          overflow: hidden;
        }
        .foreground-left {
          will-change: transform;
          filter: blur(1px);
          transform: scale(1.0);
          width: 50%;
          height: 100%;
          background-image: url('/static/img/welcome/fg-left.png');
          background-repeat: no-repeat;
          background-size: contain;
        }
        .foreground-right {
          will-change: transform;
          filter: blur(1px);
          transform: scale(1.0);
          width: 50%;
          height: 100%;
          background-image: url('/static/img/welcome/fg-right.png');
          background-repeat: no-repeat;
          background-size: contain;
          background-position: right;
        }
        .background {
          will-change: transform;
          position: absolute;
          height: 100%;
          width: 100%;
          background-image: url('/static/img/welcome/fg-right.png');
          background-repeat: no-repeat;
          background-size: contain;
          background-position: center;
        }
        .centerpiece {
          will-change: opacity;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translateX(-50%);
        }
        .centerpiece.inverse {
          opacity: 0;
        }
        .horizontalbar {
          will-change: width;
          padding: 1rem 0;
          border-top: 1px solid #000;
          width: 30px;
        }
      `}</style>
    </div>
  )
}

export default Banner;
