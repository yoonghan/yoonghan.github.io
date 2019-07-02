`use strict`

/**
  A button.
  **/

import * as React from "react";

export interface ButtonProps {
}

export const Button: React.SFC<ButtonProps> = ({children}) => {

  const color = '#FFA';
  const hoverColor = '#EE9';

  return (
    <React.Fragment>
      <div className="btn-container">
        <div className="btn-layer1">
          {children}
        </div>
        <div className="btn-layer2"/>
        <div className="btn-layer3"/>
        <div className="btn-layer4">
          {children}
        </div>
      </div>
      <style jsx>
        {`
          .btn-container {
            padding: 0.2rem;
            position: relative;
            background: ${color};
            font-size:19pt;
          }
          .btn-container:hover {
            background: ${hoverColor};
            cursor: pointer;
          }
          .btn-layer1 {
            border: 1px solid #AAA;
            content: '';
            color: ${color};
          }
          .btn-layer2 {
            top: 0;
            left: 15%;
            width: 70%;
            height: 100%;
            position: absolute;
            background: ${color};
          }
          .btn-layer3 {
            width: 100%;
            height: 50%;
            top: 25%;
            left: 0;
            position: absolute;
            background: ${color};
          }
          .btn-layer4 {
            position: absolute;
            top: 0;
            left: 0;
            text-align: center;
            width: 100%;
            height: 100%;
            padding: 0.2rem;
          }
          .btn-layer-deco1 {
            position: absolute;
            top: 0.2rem;
            left: 0.2rem;
            height: 30%;
            width: 60%;
            background: rgba(0,0,0,0.2);
          }
          .btn-layer-deco2 {
            position: absolute;
            bottom: 0;
            right: 0;
            height: 50%;
            width: 30%;
            background: rgba(0,0,0,0.2);
          }
        `}
      </style>
    </React.Fragment>
  );
}
