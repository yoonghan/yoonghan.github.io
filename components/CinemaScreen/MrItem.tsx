`use strict`

/**
  A cinematic screen like, where it will obtain full screen, with important display in front.
  **/

import * as React from "react";
import { MrTitle } from "./MrTitle";
import { MrButton } from "./MrButton";

export interface MrItemProps {
  title: string;
  btnOneStr: string;
  btnTwoStr: string;
  btnOneClick: string;
  btnTwoClick: string;
}

export const MrItem: React.SFC<MrItemProps> = ({title, btnOneStr, btnOneClick, btnTwoStr, btnTwoClick}) => {
  return (
    <div className={'mr-item'}>
      <h3>A site journey of 2</h3>
      <MrTitle title={title}/>
      <MrButton
        btnOneStr={btnOneStr} btnOneClick={btnOneClick}
        btnTwoStr={btnTwoStr} btnTwoClick={btnTwoClick}/>
      <style jsx>{`
        div.mr-item {
          width: 200px;
          top: 50%;
          left: 50%;
          position: absolute;
          transform: translate(-50%, -50%);
        }
        h3 {
          text-align: center;
        }
      `}</style>
    </div>
  );
}
