import * as React from "react";
import {ERROR} from "../../shared/style";

interface InvalidInputProps {
  invalidInput: string;
}

const trimInput = (input:string) => {
  const _input = input.trim();
  return _input.length > 5 ? _input.substring(0,5)+"...": _input;
}

const InvalidInput: React.SFC<InvalidInputProps> = ({invalidInput}) => {
  return (
    <div className="error">
      {trimInput(invalidInput)} - command not found
      <style jsx>{`
        .error {
          font-family: Inconsolata;
          font-size: ${ERROR.FONT_SIZE};
          color: ${ERROR.FOREGROUND};
          position: absolute;
          top: 0;
          left: 7rem;
        }
      `}</style>
    </div>
  );
}

export default InvalidInput;
