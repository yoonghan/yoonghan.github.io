`use strict`

import * as React from "react";
import Button from "../Button";

export interface MiniframeProps {
  iframeLink: string;
  title: string;
  githubLink?: string;
  closeCallback: ()=>void;
}

const Miniframe: React.SFC<MiniframeProps> = ({iframeLink, title, githubLink, closeCallback}) => {
  return (
    <div className={'miniframe'}>
      <div className={'title'}>
        <Button onClickCallback={closeCallback}>
          <i className="fas fa-chevron-left"></i> {title}
        </Button>
      </div>
      <div>{githubLink}</div>
      <iframe src={iframeLink} height="100%" width="100%"/>
      <style jsx>{`
        .miniframe {
          height: 100vh;
          width: 100vw;
        }
        .title {
          margin: 20px;
        }
      `}</style>
    </div>
  );
}

export default Miniframe;
