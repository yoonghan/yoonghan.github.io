`use strict`

import * as React from "react";
import Button from "../../Button";
import Portal from "./Portal";

interface IPortal {
  graphImg: string;
}

const Graph:React.FC<IPortal> = ({graphImg}) => {
  const [showPortal, setShowPortal] = React.useState({show:false, x:0, y:0});

  const toggleShowPortal = (e:any) => {
    const toSet = {show: !showPortal.show, x: 0, y: 0}
    if(e) {
      toSet.x = e.pageX;
      toSet.y = e.pageY;
    }
    setShowPortal(toSet);
  }

  return (
    <div className="container">
      <h2 className="title">Our roadmap and journey</h2>
      <div>
        <Button
          onClickCallback={toggleShowPortal}
          color={'rgba(51,153,67)'}
          >See our journey</Button>

           -or-

          <Button
            href={"/motivation"}
            color={'rgba(51,153,67)'}
            >Motivation</Button>
        <img src={graphImg} className="hidden-preload"/>
        {showPortal.show &&
          <Portal
            imgSrc={graphImg}
            closeCallback={toggleShowPortal}
            clickLocationX={showPortal.x}
            clickLocationY={showPortal.y}
            />}
      </div>
      <style jsx>{`
        .container {
          height: 100vh;
          max-height: 500px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          position:relative;
        }
        .container::before {
          content:'';
          height: 100%;
          width: 100%;
          background: rgba(51,153,67, 0.2) url("/img/welcome/connection.png") repeat center top;
          position: absolute;
        }
        .container:hover::before {
          filter: blur(1px)
        }
        .title {
          padding: 2rem;
        }
        .hidden-preload {
          display: none;
        }
      `}</style>
    </div>
  );
}

export default Graph;
