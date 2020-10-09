`use strict`

import * as React from "react";
import * as ReactDOM from "react-dom";
import {ESC} from "../../../shared/keyboardkey";
import globalStyles from '../../../shared/style';
import MoveIcon from '../../MoveIcon';

interface IPortal {
  closeCallback: (e?:any) => void;
  clickLocationX: number;
  clickLocationY: number;
  imgJpgSrc: string;
  imgWebpSrc: string;
}

const Portal:React.FC<IPortal> = ({closeCallback, clickLocationX, clickLocationY, imgJpgSrc, imgWebpSrc}) => {
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
      overlayRef.current.addEventListener("mousemove", _moveLens, {passive: true});
      overlayRef.current.addEventListener("touchmove", _moveLens, {passive: true});
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

    const box = _graphRef.getBoundingClientRect();
    const shouldCenterX = box.width < window.innerWidth;
    pos = getCursorPos(e, box);
    x = pos.x;
    y = pos.y;
    x = x * cx;
    y = y * cy;
    x = x - (box.width / cx / 2);
    y = y - (box.height / cy / 2);
    if(x >  maxXPos) {x=maxXPos}
    if(y > maxYPos ) {y=maxYPos}
    if(x < 0) {x=0}
    if(y < 0) {y=0}
    const xPos = `-${x}px`;
    _overlayRef.style.backgroundPosition = `${shouldCenterX?'center':xPos} -${y}px`;

    function getCursorPos(e:any, box:DOMRect) {
      var x = 0, y = 0;
      e = e.targetTouches? e.targetTouches[0] : e;
      x = e.clientX - box.left;
      y = e.clientY - box.top;
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
      <picture>
        <source srcSet={imgWebpSrc} type="image/webp" />
        <source srcSet={imgJpgSrc} type="image/jpg" />
        <img
          id="imgid"
          alt="portal-img"
          src={imgJpgSrc}
          ref={graphRef}
          onLoad={zoomIntoImage}
          className="hidden-image" />
      </picture>
      <div className="overlay-container"
        ref={overlayRef}
        ></div>

      <MoveIcon
        scrollContainer={portalRef}
        hasLeft={true}
        hasTop={true}
        hasRight={true}
        hasBottom={true}
        />
      <div className={"buttonContainer"} onClick={closeCallback}>
        <button>[ESC]</button>
      </div>
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
          width: 100vw;
          height: 100vh;
          background: #999;
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
