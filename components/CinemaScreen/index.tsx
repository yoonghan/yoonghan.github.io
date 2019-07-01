`use strict`

/**
  A cinematic screen like, where it will obtain full screen, with important display in front.
  **/

import * as React from "react";
import {MrItem} from "./MrItem";

export interface CinemaScreenProps {
}

export const CinemaScreen: React.SFC<CinemaScreenProps> = ({}) => {
  return (
    <React.Fragment>
      <div className={'cinema-screen'}>
        <MrItem/>
      </div>
      <style jsx>{`
        div.cinema-screen {
          background: #ff00ff;
          position: relative;
          height: 100%;
          width: 100%;
        }
      `}</style>
    </React.Fragment>
  );
}
