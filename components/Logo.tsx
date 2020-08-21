`use strict`

import * as React from "react";

export interface LogoProps {
  withText?: boolean;
}

const Logo: React.SFC<LogoProps> = ({withText = false}) => {
  return (
    <React.Fragment>
      <img className={"logo-img"} src="/img/logo/logo-color.svg" alt="Walcron Logo"/>
      {withText && <div> Walcron</div>}
      <style jsx>{`
        .logo-img {
          width: 50px;
          position: absolute;
          top: 10px;
          right: 10px;
        }

        @media only screen and (max-width: 480px) {
          .logo-img {
            width: 88px;
            transform: translateX(50%);
            right: 50%;
          }
        }
      `}</style>
    </React.Fragment>
  );
}

export default Logo;
