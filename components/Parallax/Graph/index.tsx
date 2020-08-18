`use strict`

import * as React from "react";
import Button from "../../Button";
import Portal from "./Portal";

const Graph:React.FC<any> = ({}) => {
  const [showPortal, setShowPortal] = React.useState(false);

  const toggleShowPortal = () => {
    setShowPortal(!showPortal);
  }

  return (
    <div className="container">
      <h3 className="title">Our roadmap and journey</h3>
      <div>
        <Button onClickCallback={toggleShowPortal}>See my journey</Button>
        {showPortal && <Portal closeCallback={toggleShowPortal}/>}
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
      `}</style>
    </div>
  );
}

export default Graph;
