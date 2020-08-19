`use strict`

import * as React from "react";
import { useEffect, useRef } from "react";
import {useSpring, animated} from 'react-spring';

interface IPlainSection {
  title?:string;
}

const PlainSection:React.FC<IPlainSection> = ({title, children}) => {
  const [props, set] = useSpring(()=>({opacity: 0, padding: 0}));
  const markAndIndicator = useRef<HTMLDivElement>(null);

  const attachObserverForImageDisplay = () => {
    if(markAndIndicator.current !== null) {
      const options = {
        rootMargin: "100px 0px 0px 0px",
        threshold: 0.8
      };
      const callback = function(entries: Array<IntersectionObserverEntry>) {
        entries.forEach(function(entry) {
          if(entry.intersectionRatio > 0.5) {
            set({opacity: 1, padding: 20})
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
    <div ref={markAndIndicator}
      className="container">
      <animated.div
        style={props}
        >
        {title && <h3 className="title">{title}</h3>}
        <div className="desc">
          {children}
        </div>
      </animated.div>

      <style jsx>{`
        .container {
          padding: 1rem;
          display: flex;
          justify-content: center;
          align-self: center;
        }
        .title {
          text-align: center;
        }
      `}</style>
    </div>
  );
}

export default PlainSection;
