`use strict`

import * as React from "react";
import * as ReactDOM from "react-dom";
import {ESC} from "../../../shared/keyboardkey";

interface IPortal {
  closeCallback: (e?:any) => void;
  clickLocationX: number;
  clickLocationY: number;
  imgSrc: string;
}

const Portal:React.FC<IPortal> = ({closeCallback, clickLocationX, clickLocationY, imgSrc}) => {
  const el = React.useMemo(() => document.createElement('div'), []);
  const graphRef = React.useRef<HTMLImageElement>(null);
  const portalRef = React.useRef<HTMLDivElement>(null);
  const overlayRef = React.useRef<HTMLDivElement>(null);
  const htmlDoc = document.getElementsByTagName("body")[0];
  var cx:number, cy:number, maxXPos:number, maxYPos:number, _moveLens:(e:Event) => void;

  React.useEffect(() => {
    const target = document.body;
    el.className = "portal-container";
    target.appendChild(el);

    htmlDoc.addEventListener('keyup', keyListenerEvent);

    if(overlayRef.current !== null && graphRef.current !== null) {
      _moveLens = moveLens(overlayRef.current, graphRef.current);
      overlayRef.current.addEventListener("mousemove", _moveLens);
      overlayRef.current.addEventListener("touchmove", _moveLens);
    }

    if(graphRef.current !== null) {
      if(graphRef.current.complete) {
        zoomIntoImage();
      }
    }

    return () => {
      target.removeChild(el);
      htmlDoc.removeEventListener('keyup', keyListenerEvent);

      if(overlayRef.current !== null) {
        overlayRef.current.removeEventListener("mousemove", _moveLens);
        overlayRef.current.removeEventListener("touchmove", _moveLens);
      }
    };
  }, []);

  const keyListenerEvent = (evt: KeyboardEvent) => {
    if ( (evt.keyCode as any) === ESC )   {
       closeCallback();
    }
  };

  const moveLens = (_overlayRef:HTMLDivElement, _graphRef:HTMLImageElement) => (e:Event) => {
    var pos, x, y;
    pos = getCursorPos(e);
    x = pos.x;
    y = pos.y;
    x = x * cx;
    y = y * cy;
    if(x >  maxXPos) {x=maxXPos}
    if(y > maxYPos ) {y=maxYPos}
    if(x < 0) {x=0}
    if(y < 0) {y=0}
    _overlayRef.style.backgroundPosition = "-" + (x) + "px -" + (y) + "px";

    function getCursorPos(e:any) {
      var a, x = 0, y = 0;
      e = e || window.event;
      a = _graphRef.getBoundingClientRect();
      x = (e.pageX || e.clientX) - a.left;
      y = (e.pageY || e.clientY) - a.top;
      x = x - window.pageXOffset;
      y = y - window.pageYOffset;
      return {x : x, y : y};
    }
  }

  const zoomIntoImage = () => {
    if(graphRef.current !== null && overlayRef.current !== null) {
      const result = overlayRef.current;
      const img = graphRef.current;
      const lensBoxX = result.offsetWidth;
      const lensBoxY = result.offsetHeight;
      cx = img.offsetWidth / lensBoxX;
      cy = img.offsetHeight / lensBoxY;
      maxXPos = (cx - 1) * lensBoxX;
      maxYPos = (cy - 1) * lensBoxY;
      result.style.backgroundImage = "url('" + img.src + "')";
      result.style.backgroundSize = (img.width) + "px " + (img.height) + "px";
      _moveLens(new MouseEvent('', {clientX:clickLocationX, clientY:clickLocationY}));
    }
  }



  const drawPortal = () => (
    <div
      className="portal"
      ref={portalRef}>
      <img
        id="imgid"
        src={imgSrc}
        ref={graphRef}
        onLoad={zoomIntoImage}
        className="hidden-image" />
      <div className="overlay-container"
        ref={overlayRef}
        ></div>
      <div className={"buttonContainer"} onClick={closeCallback}>
        <button>[ESC]</button>
      </div>
      <style jsx>{`
        :global(.portal-container) {
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          position: fixed;
          animation: expandWidth 0.5s;
          overflow: hidden;
        }
        @keyframes expandWidth {
          from {width: 0px;}
          to {width: 100vw;}
        }
        .buttonContainer {
          position: absolute;
          top: 1rem;
          right: 1rem;
        }
        .buttonContainer button {
          border: 0;
          cursor: pointer;
          background: transparent;
          color: #FFF;
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
          width: 100vw;
          height: 100vh;
          background: #000;
          position: relative;
        }
      `}</style>
    </div>
  )

  return ReactDOM.createPortal(drawPortal(), el);
}

export default Portal;
