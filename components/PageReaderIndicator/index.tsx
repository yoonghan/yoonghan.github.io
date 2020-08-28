`use strict`

import * as React from "react";
import {PRIMARY_ORANGE} from "../../shared/style";

interface IPageReaderIndicator {
  scrollContainer: React.RefObject<HTMLDivElement>;
}

const PageReaderIndicator:React.FC<IPageReaderIndicator> = ({scrollContainer}) => {
  const scrollMonitorRef = React.useRef<HTMLDivElement>(null);

  const _updateScrollPercentage = (e:any) => {
    const _pos = e.target.scrollTop;
    const _posHeight = e.target.scrollHeight - e.target.offsetHeight;
    const _calc = (_pos/_posHeight) * 100;
    if(scrollMonitorRef.current !== null) {
      scrollMonitorRef.current.style.height = `${Math.floor(_calc)}%`;
    }
  }

  React.useEffect(() => {
    if(scrollContainer.current !== null) {
      scrollContainer.current.addEventListener('scroll', _updateScrollPercentage);
    }
  }, [])

  return (
    <div className="scroll-percentage" ref={scrollMonitorRef}>
      <style>{`
        .scroll-percentage {
          will-change: height;
          transition: height 200ms;
          position: fixed;
          width: 3px;
          height: 0%;
          right: 0;
          background-color: ${PRIMARY_ORANGE};
          z-index: 999;
          bottom: 0;
        }
        `}</style>
    </div>
  )
}

export default PageReaderIndicator;
