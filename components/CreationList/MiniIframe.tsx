`use strict`

import * as React from "react";
import Button from "../Button";

export interface MiniframeProps {
  iframeLink: string;
  title: string;
  githubLink?: string;
  usage?:string;
  closeCallback: ()=>void;
}

const renderUsage = (usage?:string) => {
  if(!usage) {
    return <React.Fragment/>;
  }

  const usageTxts = usage.split("\n");
  const liElements = usageTxts.map((usageTxt, idx) => (
    <li key={`_creationlist_miniframe_${idx}`}>{usageTxt}</li>
  ));
  return (
    <div className="container">
      <strong>Usage:</strong>
      <ol>
      {liElements}
      </ol>
      <style jsx>{`
        .container {
          margin: 4rem 2rem;
        }
      `}</style>
    </div>
  );
}

const Miniframe: React.SFC<MiniframeProps> = ({iframeLink, githubLink, usage, closeCallback}) => {
  return (
    <div className={'miniframe'}>
      <div className={'title'}>
        <Button onClickCallback={closeCallback} small={true}>
          <i className="fas fa-chevron-left icon-spacing"></i> Return
        </Button>
        {
          githubLink &&
          <Button href={githubLink} target="sourcecode" small={true}>
            <i className="fab fa-github-alt icon-spacing"></i> Source Code
          </Button>
        }
        <Button href={iframeLink} target="extWindow" small={true}>
          Open In New Window
        </Button>
      </div>
      <div>
        {renderUsage(usage)}
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
