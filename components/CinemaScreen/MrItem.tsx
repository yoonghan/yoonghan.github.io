`use strict`

/**
  A cinematic screen like, where it will obtain full screen, with important display in front.
  **/

import * as React from "react";
import { MrTitle } from "./MrTitle";

export interface MrItemProps {
}

export const MrItem: React.SFC<MrItemProps> = ({}) => {
  return (
    <React.Fragment>
      <div className={'mr-item'}>
        <MrTitle/>
      </div>
      <style jsx>{`
        div.mr-item {
          background: #00ff00;
          width: 100px;
          height: 100px;
          top: 50%;
          left: 50%;
          position: absolute;
          transform: translate(-50%, -50%);
        }
      `}</style>
    </React.Fragment>
  );
}
