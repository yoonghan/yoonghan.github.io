import * as React from "react";
import {ERROR} from "../../shared/style";

interface InvalidCommandProps {
  invalidCommand: string;
}


const InvalidCommand: React.SFC<InvalidCommandProps> = ({invalidCommand}) => {
  return (
    <div className="error">
      Msg: {(invalidCommand)}
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

export default InvalidCommand;
