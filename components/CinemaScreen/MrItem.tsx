`use strict`

/**
  A cinematic screen like, where it will obtain full screen, with important display in front.
  **/

import * as React from "react";
import { MrTitle } from "./MrTitle";
import { MrButton } from "./MrButton";

export interface MrItemProps {
  btnOneStr: string;
  btnTwoStr: string;
}

export const MrItem: React.SFC<MrItemProps> = ({title, btnOneStr, btnTwoStr}) => {
  return (
    <div className={'mr-item'}>
      <MrTitle title={title}/>
      <MrButton btnTwoStr={btnTwoStr} btnOneStr={btnOneStr}/>
      <style jsx>{`
        div.mr-item {
          width: 200px;
          top: 50%;
          left: 50%;
          position: absolute;
          transform: translate(-50%, -50%);
        }
      `}</style>
    </div>
  );
}
