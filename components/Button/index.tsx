`use strict`

/**
  A button.
  **/

import * as React from "react";

export interface ButtonProps {
}

const Button: React.SFC<ButtonProps> = ({children}) => {
  return (
    <React.Fragment>
      <div className="btn-container">
        {children}
      </div>
      <style jsx>
        {`
          .btn-container {
            padding: 0.5rem;
            position: relative;
            background: rgba(200,200,200,0.1);
            transition-property: color, background;
            transition-duration: .15s;
            transition-timing-function: ease-in-out;
            color: #FFF;
            font-size:1rem;
            text-align: center;
            border-radius: 4px;
            font-weight: bold;
          }
          .btn-container:hover {
            background: #FFF;
            color: #000;
          }
        `}
      </style>
    </React.Fragment>
  );
}

export default Button;
