`use strict`

/**
  A cinematic screen like, where it will obtain full screen, with important display in front.
  **/

import * as React from "react";
import Button from "../Button";

export interface MrButtonProps {
  btnOneStr: string;
  btnTwoStr: string;
}

export const MrButton: React.SFC<MrButtonProps> = ({btnOneStr, btnTwoStr}) => {
  return (
    <div className={"buttons"} align="center">
      <Button>{btnOneStr}</Button>
      <Button>{btnTwoStr}</Button>
      <style jsx>{`
        .buttons {
          margin-top: 2rem;
          display: flex;
          justify-content: space-between;
        }
      `}</style>
    </div>
  );
}
