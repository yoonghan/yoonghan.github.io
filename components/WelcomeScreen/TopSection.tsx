`use strict`

import * as React from "react";
import {useRef, useEffect}  from "react";

interface ITopSection {
  scrollContainer: React.RefObject<HTMLDivElement>;
  onDoorKnocked: boolean;
}

const TopSection:React.FC<ITopSection> = ({scrollContainer, onDoorKnocked}) => {
  const backgroundRef = useRef<HTMLDivElement>(null);
  const leftForegroundRef = useRef<HTMLDivElement>(null);
  const rightForegroundRef = useRef<HTMLDivElement>(null);
  const centerpieceTitleRef = useRef<HTMLDivElement>(null);
  const centerpieceDescRef = useRef<HTMLDivElement>(null);
  const parallaxDisplayContainerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  var parallaxDisplayContainerSize = 0;
  const allowedDescToKickstart = 0.4;
  const allowedBackgroundScaledDistance = 5;

  const parallaxScrollForeground = (e:any) => {
    const pos = e.target.scrollTop;
    const height = e.target.offsetHeight;
    const opacityPercentage = (pos + height) / parallaxDisplayContainerSize;
    const scaledPos = pos / 100;
    const translatePos = pos * 2;
    if(scaledPos < 2.0) {
      if(leftForegroundRef.current !== null && rightForegroundRef.current !== null) {
        leftForegroundRef.current.style.transform = `scale(${1.0 + (scaledPos)}) translateX(-${translatePos}px)`;
        rightForegroundRef.current.style.transform = `scale(${1.0 + (scaledPos)}) translateX(${translatePos}px)`;
      }
      if(backgroundRef.current !== null) {
        backgroundRef.current.style.transform = `scale(${1.0 + (scaledPos/allowedBackgroundScaledDistance)})`
      }
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

  useEffect(() => {
    if(parallaxDisplayContainerRef !== null && parallaxDisplayContainerRef.current !== null) {
      parallaxDisplayContainerSize = (parallaxDisplayContainerRef.current.clientHeight / 2);
    }
  }, [onDoorKnocked])

  useEffect(() => {
    if(scrollContainer.current !== null) {
      scrollContainer.current.addEventListener('scroll', parallaxScrollForeground);
    }

    return () => {
      if(scrollContainer.current !== null) {
        scrollContainer.current.removeEventListener('scroll', parallaxScrollForeground);
      }
    }
  }, []);

  return (
    <div className="parallax-container" ref={parallaxDisplayContainerRef}>
      <div className="centerpiece" ref={centerpieceTitleRef}>Title</div>
      <div className="centerpiece inverse" ref={centerpieceDescRef}>
        <div>Description</div>
        <div className="horizontalbar" ref={lineRef}></div>
      </div>
      <div className="foreground">
        <div className="background" ref={backgroundRef}></div>
        <div className="foreground-left" ref={leftForegroundRef}>
        </div>
        <div className="foreground-right" ref={rightForegroundRef}>
        </div>
      </div>
      <style jsx>{`
        .parallax-container {
          width: 100vw;
          height: 330vw;
        }
        .foreground {
          position: sticky;
          height: 66vw;
          top: 0;
          display: flex;
        }
        .foreground-left {
          will-change: transform;
          transform: scale(1.0);
          width: 50%;
          height: 100%;
          background-image: url('/img/welcome/fg-left.png');
          background-repeat: no-repeat;
          background-size: contain;
        }
        .foreground-right {
          will-change: transform;
          transform: scale(1.0);
          width: 50%;
          height: 100%;
          background-image: url('/img/welcome/fg-right.png');
          background-repeat: no-repeat;
          background-size: contain;
        }
        .background {
          will-change: transform;
          position: absolute;
          height: 100%;
          width: 100%;
          background-image: url('/img/welcome/fg-right.png');
          background-repeat: no-repeat;
          background-size: contain;
          background-position: center;
        }
        .centerpiece {
          will-change: transform;
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

        @keyframes riseAndShine {
          from {background-color: yellow;}
          to {background-color: orange;}
        }
      `}</style>
    </div>
  )
}

export default TopSection;
