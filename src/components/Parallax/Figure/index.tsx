`use strict`

import * as React from "react";
import { useEffect, useRef, useState } from "react";
import globalStyles from '../../../shared/style';

interface IFigure {
  imageAlt: string;
  imageJpgSrc: string;
  imageWebpSrc: string;
  isImagePositionOnRight?: boolean;
}

const Figure:React.FC<IFigure> = ({imageAlt, imageJpgSrc, imageWebpSrc, isImagePositionOnRight, children}) => {
  const markAndIndicator = useRef<HTMLDivElement>(null);

  const [animatedClassName, setAnimatedClassName] = useState("");

  const attachObserverForImageDisplay = () => {
    if(markAndIndicator.current !== null) {
      const options = {
        rootMargin: "100px 0px 0px 0px",
        threshold: 0.5
      };
      const callback = function(entries: Array<IntersectionObserverEntry>) {
        entries.forEach(function(entry) {
          if(entry.intersectionRatio > 0.4) {
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
          <picture className={"figure-border default-animate-height " + animatedClassName}>
            <source srcSet={imageWebpSrc} type="image/webp" />
            <source srcSet={imageJpgSrc} type="image/jpg" />
            <img
              alt={imageAlt}
              src={imageJpgSrc}
              className={"figure-border default-animate-height " + animatedClassName}/>
          </picture>
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
            padding: 2rem 1rem;
            display: flex;
            justify-content: center;
          }
          .figure img {
            width: 100%;
            display: block;
            object-fit: contain;
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
          @media only screen and (max-width: 640px) {
            .container {
              flex-direction: column-reverse;
            }
            .container.inverse {
              flex-direction: column-reverse;
            }
            .figure {
              width: 50%;
              margin: auto;
            }
            .figure-caption {
              width: 100%;
            }
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
