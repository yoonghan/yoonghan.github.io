`use strict`

import * as React from "react";
import { useEffect, useRef, useState } from "react";
import globalStyles from '../../../shared/style';

interface IFigure {
  imageSrc: string;
  isImagePositionOnRight?: boolean;
}

const Figure:React.FC<IFigure> = ({imageSrc, isImagePositionOnRight, children}) => {
  const markAndIndicator = useRef<HTMLDivElement>(null);

  const [animatedClassName, setAnimatedClassName] = useState("");

  const attachObserverForImageDisplay = () => {
    if(markAndIndicator.current !== null) {
      const options = {
        rootMargin: "100px 0px 0px 0px",
        threshold: 0.8
      };
      const callback = function(entries: Array<IntersectionObserverEntry>) {
        entries.forEach(function(entry) {
          if(entry.intersectionRatio > 0.5) {
            setAnimatedClassName("animate");
          }
        })
      }
      const observer = new IntersectionObserver(callback, options);
      observer.observe(markAndIndicator.current)
    }
  }

  /** Use browser rather than react to monitor change **/
  useEffect(() => {
    attachObserverForImageDisplay();
  }, []);

  return (
    <>
      <div className={"container " + (isImagePositionOnRight?"inverse":"")}>
        <div className="figure">
          <img
            src={imageSrc}
            className={"figure-border default-animate-height " + animatedClassName}/>
        </div>
        <div
            className={"figure-caption default-animate-margin " + animatedClassName}
            ref={markAndIndicator}>
          {children}
        </div>
        <style jsx>{`
          .container {
            display: flex;
            flex-direction: row;
          }
          .container.inverse {
            flex-direction: row-reverse;
            text-align: right;
          }
          .figure {
            width: 30%;
            padding: 1rem;
            display: flex;
            justify-content: center;
          }
          .figure img {
            display: block;
          }
          .figure-border {
            border: 1px solid rgba(90, 90, 90,0.2);
          }
          .figure-caption {
            width: 70%;
            padding: 1rem;
            padding-top: 3rem;
            display: flex;
            justify-content: center;
            flex-direction: column;
          }
        `}</style>
        <style jsx global>
          {globalStyles}
        </style>
      </div>
    </>
  )
}

export default Figure;
