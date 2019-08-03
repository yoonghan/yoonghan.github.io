`use strict`

import * as React from "react";
import produce, {Draft} from "immer";
import HorizontalLine from "../HorizontalLine";
import {LINK, FOREGROUND} from "../../shared/style";
import Button from "../Button";
import MiniIframe from "./MiniIframe";

interface WorklistItem {
  id: string;
  link: string;
  title: string;
  desc: string;
}

export interface WorklistProps {
  workArr?: Array<WorklistItem>;
}

export interface WorklistStates {
  isIframeOpen: boolean;
}

class Worklist extends React.PureComponent<WorklistProps, WorklistStates> {
  constructor(props: WorklistProps) {
    super(props);
    this.state = {
      isIframeOpen: false
    }
  }

  _getUrl = (url:string) => {
    return `/work/${url}`;
  }

  _createdIdxKey = (workArr:Array<WorklistItem>) => (
    workArr.map((work, idx) => (
      <li key={`_work_idx_${idx}`}><a href={`#${work.id}`}>{work.title}</a></li>
    ))
  )

  _clickArticle = () => () => {
    this.setState(
      produce((draft: Draft<WorklistStates>) => {
        draft.isIframeOpen = true;
        window.scrollTo(0,0);
      })
    );
  }

  _closeIframe = () => {
    this.setState(
      produce((draft: Draft<WorklistStates>) => {
        draft.isIframeOpen = false;
      })
    );
  }

  _createdArticles = (workArr:Array<WorklistItem>) => (
    workArr.map((work, idx) => (
      <article key={`_work_article_${idx}`}>
        <div id={work.id}>
          <h2>{work.title}</h2>
          <img src={"img"} alt="prototyper" />
          <p>
            {work.desc}
          </p>
          <div className="btn-container">
            <Button onClickCallback={this._clickArticle()}>
              View
            </Button>
          </div>
        </div>
        <style jsx>
          {`
            .btn-container {
              padding: 40px 0;
            }
          `}
        </style>
        <HorizontalLine/>
        <style>{`
          article {
            color: ${FOREGROUND};
          }
          `}</style>
      </article>
    ))
  )

  render() {
    const {workArr} = this.props;
    const {isIframeOpen} = this.state;

    if(!workArr) {
      return <div>Opps, nothing to display</div>
    }

    if(isIframeOpen) {
      return <MiniIframe iframeLink={"test"}
            title={"title"} closeCallback={this._closeIframe}/>
    }

    return (
      <div className={'container'}>
        <section className={`indexer`}>
          <h3>Contents:</h3>
          <ul>
            {this._createdIdxKey(workArr)}
          </ul>
        </section>
        {this._createdArticles(workArr)}
        <style jsx>
          {`
            .indexer {
              border: 1px double ${FOREGROUND};
              color: ${FOREGROUND};
              padding: 20px;
              border-radius: 5px;
              max-width: 360px;
              margin-bottom: 40px;
            }
            :global(.indexer a) {
              text-decoration: none;
              color: ${LINK.FOREGROUND};
            }
            .container {
              max-width: 640px;
              margin: auto;
            }
          `}
        </style>
      </div>
    );
  }
}

export default Worklist;
