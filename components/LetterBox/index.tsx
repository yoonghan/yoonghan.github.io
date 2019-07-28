`use strict`

import * as React from "react";
import Button from "../Button";

export interface LetterBoxProps {
}

const LetterBox: React.SFC<LetterBoxProps> = ({}) => {
  return (
    <div className={'letterbox-container'}>
      <input type="text" autoComplete="off" className={"letterbox-input"}/>
      <Button>Send</Button>
      <style jsx>{`
        .letterbox-container {

        }
        .letterbox-input {

        }
      `}</style>
    </div>
  );
}

export default LetterBox;
