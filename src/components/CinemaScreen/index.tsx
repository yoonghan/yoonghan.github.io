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
  btnOneClick: string;
  btnTwoClick: string;
}

const CinemaScreen: React.SFC<CinemaScreenProps> = (props) => {
  return (
    <div style={{
      height: "100%",
      width: "100%"
    }}>
      <MrItem {...props}/>
    </div>
  );
}

export default CinemaScreen;
