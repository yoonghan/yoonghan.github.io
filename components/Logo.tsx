`use strict`

import * as React from "react";

export interface LogoProps {
  withText?: boolean;
}

export const Logo: React.SFC<LogoProps> = ({withText = false}) => {
  return (
    <React.Fragment>
      <div className={'logo-container'}>
        <img src="/static/img/logo/logo-color.svg"/>
        {withText && <div> Walcron</div>}
      </div>
      <style jsx>{`
        .logo-container img {
          position: absolute;
          width: 60px;
          top: 10px;
          display: inline;
          left: 20px;
        }
        .logo-container div {
          position: absolute;
          top: 20px;
          font-size: 20pt;
          font-family: arial;
          left: 90px;
          font-weight: 700;
        }
      `}</style>
    </React.Fragment>
  );
}
