`use strict`

import * as React from "react";
import { useEffect, useRef, useState } from "react";
import globalStyles from '../../../../shared/style';

interface ICinemaCountdown {
  percentage: number;
  countdown: number;
}

const CinemaCountdown:React.FC<ICinemaCountdown> = ({percentage, countdown}) => {

  const deg = (360 * percentage / 100);

  return (
    <div className="container">
      <div className="background">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className="centerpiece-line"></div>
      <div className="centerpiece-circle"></div>
      <div className="centerpiece-text">{countdown}</div>
      <style jsx>{`
        .container {
          position: relative;
          width: 100vw;
          height: 100vh;
        }
        .background {
          display: grid;
          grid-template-columns: auto auto;
          grid-template-rows: auto;
          width: 100%;
          height: 100%;
        }
        .background div:nth-child(1) {
          border-bottom: 1px solid;
          border-right: 1px solid;
        }
        .background div:nth-child(2) {
          border-bottom: 1px solid;
        }
        .background div:nth-child(3) {
          border-right: 1px solid;
        }
        .centerpiece-text {
          font-size: 20vw;
          text-align: center;
          width: 100%;
          height: 100%;
          position: absolute;
          transform: translateY(50%);
          line-height: 0;
          top: 0;
        }
        .centerpiece-circle {
          width: 30vw;
          height: 30vw;
          border: 10px solid;
          border-radius: 30vw;
          position: absolute;
          transform: translate(-50%, -50%);
          top: 50%;
          left: 50%;
        }
        .centerpiece-line {
          border-bottom: 10px solid grey;
          width: 50%;
          position: absolute;
          top: 50%;
          right: 50%;
          transform: rotate(${deg}deg);
          transform-origin: center right;
          margin: -5px 0px;
        }
      `}</style>
      <style jsx global>
        {globalStyles}
      </style>
    </div>
  )
}

export default CinemaCountdown;
