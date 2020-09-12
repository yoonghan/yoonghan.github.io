`use strict`

/**
  A cinematic screen like, where it will obtain full screen, with important display in front.
  **/

import * as React from "react";
import HeaderOne from "../HeaderOne";

export interface MrTitleProps {
  title: string;
}

export const MrTitle: React.SFC<MrTitleProps> = ({title}) => {
  return (
    <React.Fragment>
      <HeaderOne title={title} isLined={true}/>
      <style jsx>{`
        h1 {
          display: flex;
          width: 100%;
          justify-content: center;
          align-items: center;
          text-align: center;
          color: #fff;
        }

        h1:before,
        h1:after {
          content: '';
          border-top: 2px solid;
          margin: 0 20px 0 0;
          flex: 1 0 20px;
        }

        h1:after {
          margin: 0 0 0 20px;
        }
      `}</style>
    </React.Fragment>
  );
}
