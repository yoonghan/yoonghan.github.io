import * as React from "react";
import {OUTPUT} from "../../shared/style";

interface OutputProps {
  output: (string|number);
}


const Output: React.SFC<OutputProps> = ({output}) => {
  return (
    <div className="output">
      Output: {(output)}
      <style jsx>{`
        .output {
          font-family: Inconsolata;
          font-size: ${OUTPUT.FONT_SIZE};
          color: ${OUTPUT.FOREGROUND};
          position: absolute;
          top: 0;
          left: 0;
        }
      `}</style>
    </div>
  );
}

export default Output;
