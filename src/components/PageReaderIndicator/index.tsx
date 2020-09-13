`use strict`

import * as React from "react";
import {PRIMARY_ORANGE} from "../../shared/style";

interface IPageReaderIndicator {
  scrollContainer: React.RefObject<HTMLDivElement>;
}

const PageReaderIndicator:React.FC<IPageReaderIndicator> = ({scrollContainer}) => {
  const scrollMonitorRef = React.useRef<HTMLDivElement>(null);
  const [loadPercentage, setLoadPercentage] = React.useState(0);

  const _updateScrollPercentage = (e:any) => {
    const _pos = e.target.scrollTop;
    const _posHeight = e.target.scrollHeight - e.target.offsetHeight;
    const _calc = (_pos/_posHeight) * 100;
    if(scrollMonitorRef.current !== null) {
      const percentage = Math.floor(_calc);
      setLoadPercentage(percentage);
      scrollMonitorRef.current.style.width = `${percentage}%`;
    }
  }

  const _loadInText = () => {
    if(loadPercentage < 3) {
      return "";
    }
    if(loadPercentage < 40) {
      return "more";
    }
    if(loadPercentage < 70) {
      return "half way";
    }
    if(loadPercentage < 98) {
      return "almost";
    }
    return "completed";
  }

  React.useEffect(() => {
    if(scrollContainer.current !== null) {
      scrollContainer.current.addEventListener('scroll', _updateScrollPercentage);
    }
  }, [])

  return (
    <div className="scroll-percentage" ref={scrollMonitorRef}>
      <div className="indicator"><div>{_loadInText()}</div></div>
      <style>{`
        .scroll-percentage {
          will-change: width;
          transition: width 100ms linear;
          position: fixed;
          height: 3px;
          width: 0%;
          left: 0;
          background-color: ${PRIMARY_ORANGE};
          z-index: 999;
          top: 0;
        }
        .indicator {
          color: #333;
          display: flex;
          justify-content: flex-end;
          padding-top: 2px;
          font-size: 0.75rem;
        }
        .indicator > div {
          background: ${PRIMARY_ORANGE};
          padding: 0.25rem;
          border-radius: 0 0 0.25rem 0.25rem;
          white-space: nowrap;
        }
        `}</style>
    </div>
  )
}

export default PageReaderIndicator;
