`use strict`

import * as React from "react";

export interface CarousellProps {
  elements:Array<JSX.Element>,
  uniqueName: String
}

const Carousell:React.FC<CarousellProps> = ({elements, uniqueName}) => {

  const _drawElement = (elems:Array<JSX.Element>, uniqueName:String) => {
    return elems.map((elem, idx) => (
      <React.Fragment key={`${uniqueName}_${idx}_key`}>{elem}</React.Fragment>
    ))
  }

  return (
    <div className="container">
      {_drawElement(elements, uniqueName)}
      <style jsx>{`
        .container {
          scroll-snap-type: x mandatory;
          display: flex;
          overflow-x: scroll;
          margin: 0 1rem;
        }
        .container :global(img) {
          width: 70vw;
          scroll-snap-align: start;
          max-width: 400px;
        }
      `}</style>
    </div>
  );
}

export default Carousell;
