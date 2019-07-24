`use strict`

/**
  A cinematic screen like, where it will obtain full screen, with important display in front.
  **/

import * as React from "react";
import {MrItem} from "./MrItem";

export interface CinemaScreenProps {
  title: string;
  btnOneStr: string;
  btnTwoStr: string;
}

const CinemaScreen: React.SFC<CinemaScreenProps> = (props) => {
  return (
    <div className={'cinema-screen'}>
      <MrItem {...props}/>
      <style jsx>{`
        div.cinema-screen {
          position: relative;
          height: 100%;
          width: 100%;
        }
      `}</style>
    </div>
  );
}

export default CinemaScreen;
