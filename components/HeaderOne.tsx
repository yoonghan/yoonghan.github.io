`use strict`
import * as React from "react";
import {FOREGROUND, BACKGROUND} from "../shared/style";

//There should only be one header at a time

export interface HeaderOneProps {
  title: string;
  isBlackOnWhite?: boolean;
  isLined?: boolean;
}

const HeaderOne: React.SFC<HeaderOneProps> = ({title, isBlackOnWhite, isLined}) => {
  return (
    <React.Fragment>
      <h1 className={isLined?"lined":""}>{title}</h1>
      <style jsx>
        {`
          h1 {
            color: ${isBlackOnWhite?BACKGROUND:FOREGROUND}
          }
          .lined {
            display: flex;
            width: 100%;
            justify-content: center;
            align-items: center;
            text-align: center;
            color: ${FOREGROUND};
          }
          h1.lined:before,
          h1.lined:after {
            content: '';
            border-top: 2px solid;
            margin: 0 20px 0 0;
            flex: 1 0 20px;
            max-width: 20px;
          }
          h1.lined:after {
            margin: 0 0 0 20px;
          }
        `}
      </style>
    </React.Fragment>
  );
}

export default HeaderOne;
