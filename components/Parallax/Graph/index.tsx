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
    const toSet = {show: !showPortal.show, x: e.pageX, y: e.pageY}
    setShowPortal(toSet);
  }

  return (
    <div className="container">
      <h3 className="title">Our roadmap and journey</h3>
      <div>
        <Button
          onClickCallback={toggleShowPortal}
          >See my journey</Button>
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
          background: url("https://images.pexels.com/photos/255379/pexels-photo-255379.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260");
          background-size: cover;
          background-position: center;
          transition: grayscale 0.5s;
          filter: grayscale(100%);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        .container:hover {
          filter: grayscale(0);
        }
        .title {
          padding-bottom: 2rem;
        }
        .hidden-preload {
          display: none;
        }
      `}</style>
    </div>
  );
}

export default Graph;
