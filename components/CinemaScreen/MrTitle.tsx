`use strict`

/**
  A cinematic screen like, where it will obtain full screen, with important display in front.
  **/

import * as React from "react";

export interface MrTitleProps {
}

export const MrTitle: React.SFC<MrTitleProps> = ({}) => {
  return (
    <React.Fragment>
      <h2>PROGRAMMER UND PROGRAMMERIN</h2>
      <style jsx>{`
        h2 {
          display: flex;
          width: 100%;
          justify-content: center;
          align-items: center;
          text-align: center;
          color: #fff;
        }

        h2:before,
        h2:after {
          content: '';
          border-top: 2px solid;
          margin: 0 20px 0 0;
          flex: 1 0 20px;
        }

        h2:after {
          margin: 0 0 0 20px;
        }
      `}</style>
    </React.Fragment>
  );
}
