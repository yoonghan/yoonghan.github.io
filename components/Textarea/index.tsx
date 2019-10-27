`use strict`

import React from "react";

export interface TextareaProps {
  rows: number;
  cols: number;
  text: string;
}

const Textarea: React.SFC<TextareaProps> = ({rows, cols, text}) => {
  return (
    <>
      <div className={"container"}>
        <textarea rows={rows} cols={cols} disabled={true} value={text}/>
      </div>
      <style jsx>{`
        .container {
          display: flex;
          padding: 0.2rem;
          background-color: #FFF;
          justify-content: center;
        }
        textarea {
          resize: none;
          padding: 1rem;
          width: 100%;
          max-width: 640px;
          height: 50vh;
          background-color: #000;
          border: 1px solid #000;
          color: #00ff00;
          font-family: courier new;
        }
      `}</style>
    </>
  );
}

export default Textarea;
