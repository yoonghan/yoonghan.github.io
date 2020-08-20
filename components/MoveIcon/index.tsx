`use strict`

import * as React from "react";

interface IMoveIcon {
  scrollContainer: React.RefObject<HTMLDivElement>;
  hasLeft: boolean;
  hasTop: boolean;
  hasRight: boolean;
  hasBottom: boolean;
}

const MoveIcon: React.SFC<IMoveIcon> = (props) => {
  const [show, setShow] = React.useState(true);

  const _controlIconDisplay = () => {
    if(props.scrollContainer.current !== null) {
      props.scrollContainer.current.addEventListener('mousemove', _controlIconDisplay);
      props.scrollContainer.current.addEventListener('touchmove', _controlIconDisplay);
    }
    setShow(false);
  }

  React.useEffect(() => {
    if(props.scrollContainer.current !== null) {
      props.scrollContainer.current.addEventListener('mousemove', _controlIconDisplay);
      props.scrollContainer.current.addEventListener('touchmove', _controlIconDisplay);
    }
  }, []);

  return (
    <>{
      show && (
        <div className="container">
          <div>
            {props.hasTop && <div className="arrow up"></div>}
          </div>
          <div className="col">
            <div>{props.hasLeft && <div className="arrow left"></div>}</div>
            <div>{props.hasRight && <div className="arrow right"></div>}</div>
          </div>
          <div>
            {props.hasBottom && <div className="arrow down"></div>}
          </div>
        <style jsx>{`
          .container {
            top: 0;
            bottom: 0;
            right: 0;
            left: 0;
            position: absolute;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            text-align: center;
          }
          .col {
            display: flex;
            justify-content: row;
            justify-content: space-between;
          }
          .arrow {
            border: solid black;
            border-width: 0 8px 8px 0;
            padding: 8px;
            display: inline-block;
            animation-duration: 1.5s;
            animation-iteration-count: infinite;
            animation-name: blink;
            margin: 2rem;
          }
          .arrow.left {
            transform: rotate(135deg);
          }
          .arrow.right {
            transform: rotate(-45deg);
          }
          .arrow.up {
            transform: rotate(-135deg);
          }
          .arrow.down {
            transform: rotate(45deg);
          }
          @keyframes blink {
              0% {
                  opacity: 0.5;
              }
              50% {
                  opacity: 1;
              }
              100% {
                  opacity: 0;
              }
          }`}</style>
      </div>)
    }
    </>
  )
}

export default MoveIcon;
