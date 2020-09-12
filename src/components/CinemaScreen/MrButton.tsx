`use strict`

/**
  A cinematic screen like, where it will obtain full screen, with important display in front.
  **/

import * as React from "react";
import Button from "../Button";

export interface MrButtonProps {
  btnOneStr: string;
  btnTwoStr: string;
  btnOneClick: string;
  btnTwoClick: string;
}

export const MrButton: React.SFC<MrButtonProps> = ({btnOneStr, btnOneClick, btnTwoStr, btnTwoClick}) => {
  return (
    <div className={"buttons"}>
      <Button href={btnOneClick}>{btnOneStr}</Button>
      <Button href={btnTwoClick}>{btnTwoStr}</Button>
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
