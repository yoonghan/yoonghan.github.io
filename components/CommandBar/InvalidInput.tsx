import * as React from "react";
import {ERROR} from "../../shared/style";

interface InvalidInputProps {
  invalidInput: string;
}


const trimInput = (input:string) => {
  const _input = input.trim();
  return _input.length > 6 ? _input.substring(0,4)+"...": _input;
}

const InvalidInput: React.SFC<InvalidInputProps> = ({invalidInput}) => {
  return (
    <div className="error">
      {trimInput(invalidInput)} - not found. type HELP.
      <style jsx>{`
        .error {
          font-family: Inconsolata;
          font-size: ${ERROR.FONT_SIZE};
          color: ${ERROR.FOREGROUND};
          position: absolute;
          top: 0;
          left: 0;
        }
      `}</style>
    </div>
  );
}

export default InvalidInput;
