`use strict`

import * as React from "react";

interface ICounter {
  countTo: number;
  postFix: string;
  targetToReach: number;
  targetReachCallback: () => void;
  isBlackOnWhite?: boolean;
}

const Counter: React.FC<ICounter> =
  ({countTo, postFix, targetToReach, targetReachCallback, isBlackOnWhite}) => {
  const [counter, setCounter] = React.useState(0);
  const loadingBarRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const timer = setTimeout(_count,20);
    return () => {
      clearTimeout(timer);
    }
  }, [counter, countTo]);

  React.useEffect(() => {
    if(counter === targetToReach) {
      setTimeout(targetReachCallback , 500);
    }
    if(counter > targetToReach) {
      return;
    }
    if(postFix == "%" && loadingBarRef.current !== null) {
      loadingBarRef.current.style.width = `${counter}%`;
    }
  }, [counter]);

  const _count = () => {
    if(counter < countTo) {
      setCounter(counter + 1);
    }
  }

  return (
    <div className="container">
      <div className="counter">
        <div>{counter} {postFix}</div>
        <div className="loading-bar-container">
          <div
            className={isBlackOnWhite?"loading-bar-black":"loading-bar-white"}
            ref={loadingBarRef}></div>
        </div>
      </div>

      <style jsx>{`
        .counter {
          font-size: 5rem;
          text-align: center;
        }
        .container {
          width: 100vw;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .loading-bar-container {
          width: 320px;
          height: 2rem;
          padding: 2rem;
          transition: width 200ms;
        }
        .loading-bar-black {
          height: 2rem;
          background-color: #000;
          border-radius: 3px;
        }
        .loading-bar-white {
          height: 2rem;
          background-color: #fff;
          border-radius: 3px;
        }
      `}</style>
    </div>
  )
}

export default Counter;
