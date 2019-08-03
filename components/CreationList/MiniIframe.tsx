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
          <i className="fas fa-chevron-left icon-spacing"></i> {title}
        </Button>
        {
          githubLink &&
          <Button href={githubLink} target="sourcecode">
            <i className="fab fa-github-alt icon-spacing"></i> Source Code
          </Button>
        }
      </div>
      <iframe src={iframeLink} height="100%" width="100%"/>
      <style jsx>{`
        .miniframe {
          height: 100vh;
          width: 100vw;
        }
        .miniframe iframe {
          background: #FFF;
        }
        .title {
          margin: 20px;
        }
        .icon-spacing {
          padding-right: 10px;
        }
      `}</style>
    </div>
  );
}

export default Miniframe;
