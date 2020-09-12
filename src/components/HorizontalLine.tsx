`use strict`

import * as React from "react";

const HorizontalLine: React.SFC<any> = () => {
  return (
    <React.Fragment>
      <hr/>
      <style jsx>{`
        hr {
          width: 50%;
        }
      `}</style>
    </React.Fragment>
  );
}

export default HorizontalLine;
