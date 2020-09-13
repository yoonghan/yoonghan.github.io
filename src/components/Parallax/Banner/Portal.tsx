`use strict`

import * as React from "react";
import * as ReactDOM from "react-dom";
import globalStyles from '../../../shared/style';

const Portal:React.FC<IPortal> = ({closeCallback}) => {
  const el = React.useMemo(() => document.createElement('div'), []);
  const portalRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const target = document.body;
    el.className = "portal-container";
    target.appendChild(el);

    return () => {
      target.removeChild(el);
    };
  }, []);

  const drawPortal = () => (
    <div
      className="portal"
      ref={portalRef}
      onClick={closeCallback}
      >
      Oops! no horizontal/left/right drag
      <style jsx>{`
        .buttonContainer {
          position: absolute;
          top: 1rem;
          right: 1rem;
        }
        .buttonContainer button {
          border: 0;
          cursor: pointer;
          background: transparent;
          color: #111;
        }
        .hidden-image {
          visibility: hidden;
          overflow: hidden;
        }
        .overlay-container {
          overflow: hidden;
          top: 0;
          width: 100%;
          height: 100%;
          max-width: 2000px;
          max-height: 1000px;
          position: absolute;
          background-repeat: no-repeat;
        }
        .portal {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100vw;
          height: 100vh;
          background: rgba(0,0,0,0.8);
          position: relative;
          cursor: move;
        }
      `}</style>
      <style jsx global>
        {globalStyles}
      </style>
    </div>
  )

  return ReactDOM.createPortal(drawPortal(), el);
}

export default Portal;
