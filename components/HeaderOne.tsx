`use strict`
import * as React from "react";

//There should only be one header at a time

export interface HeaderOneProps {
  title: string;
  isBlackOnWhite?: boolean;
}

const HeaderOne: React.SFC<HeaderOneProps> = ({title, isBlackOnWhite}) => {
  return (
    <React.Fragment>
      <h1>{title}</h1>
      <style jsx>
        {`
          h1 {
            color: ${isBlackOnWhite?"#000":"#FFF"}
          }
        `}
      </style>
    </React.Fragment>
  );
}

export default HeaderOne;
