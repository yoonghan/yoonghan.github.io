`use strict`

import * as React from "react";
import produce, {Draft} from "immer";
import {LINK, FOREGROUND, BACKGROUND_FLOAT, SUB_HEADER} from "../../shared/style";
import Button from "../Button";
import MiniIframe from "./MiniIframe";

interface CreationListItem {
  id: string;
  link: string;
  title: string;
  desc: string;
  gitLink?: string;
  screenshot?: string;
  usage?: string;
  internal?:boolean;
}

export interface CreationListProps {
  workArr: Array<CreationListItem>;
}

export interface CreationListStates {
  isIframeOpen: boolean;
  wrkArrIdx: number;
}

class CreationList extends React.PureComponent<CreationListProps, CreationListStates> {
  constructor(props: CreationListProps) {
    super(props);
    this.state = {
      isIframeOpen: false,
      wrkArrIdx: 0
    }
  }

  _getUrl = (url:string) => {
    return `/host/${url}/`;
  }

  _createdIdxKey = (workArr:Array<CreationListItem>) => (
    workArr.map((work, idx) => (
      <li key={`_work_idx_${idx}`}><a href={`#${work.id}`}>{work.title}</a></li>
    ))
  )

  _clickArticle = (idx:number) => () => {
    const {workArr} = this.props;
    if(typeof workArr[idx] !== "undefined" && workArr[idx].internal) {
      window.location.href = workArr[idx].link;
      return;
    }

    this.setState(
      produce((draft: Draft<CreationListStates>) => {
        draft.isIframeOpen = true;
        draft.wrkArrIdx = idx;
        window.scrollTo(0,0);
      })
    );
  }

  _closeIframe = () => {
    this.setState(
      produce((draft: Draft<CreationListStates>) => {
        draft.isIframeOpen = false;
        draft.wrkArrIdx = 0;
      })
    );
  }

  _showScreenshot = (projectTitle: string, imgSrc?: string) => {
    if(imgSrc) {
      return (
        <React.Fragment>
          <img src={`/img/creation/${imgSrc}`} alt={`Screenshot for ${projectTitle}`}/>
          <style jsx>{`
            img {
              max-width: 400px;
              max-height: 300px;
            }
          `}
          </style>
        </React.Fragment>
      );
    }

    return <React.Fragment/>
  }

  _createdArticles = (workArr:Array<CreationListItem>) => (
    workArr.map((work, idx) => (
      <article key={`_work_article_${idx}`}>
        <div id={work.id}>
          <h2 className="title">{work.title}</h2>
          {this._showScreenshot(work.title, work.screenshot)}
          <div className="container">
            <p>
              {work.desc}
            </p>
            <div className="btn-container">
              <Button onClickCallback={this._clickArticle(idx)}>
                View
              </Button>
            </div>
          </div>
        </div>
        <style jsx>{`
          .title {
            padding: 0.5rem;
            color: ${SUB_HEADER.FOREGROUND};
            background-color: ${SUB_HEADER.BACKGROUND};
            border-radius: 0.5rem 0.5rem 0 0;
            margin-bottom: 0;
          }
          .container {
            padding: 0 1rem;
            border: 1px solid;
            background-color: ${BACKGROUND_FLOAT};
          }
          article {
            color: ${FOREGROUND};
            margin: 0 0.5rem;
          }
          .btn-container {
            padding: 40px 0;
          }
          `}</style>
      </article>
    ))
  )

  render() {
    const {workArr} = this.props;
    const {isIframeOpen, wrkArrIdx} = this.state;

    if(!workArr) {
      return <div>Opps, nothing to display</div>
    }

    if(isIframeOpen) {
      const {link, title, gitLink, usage} = workArr[wrkArrIdx];
      return <MiniIframe iframeLink={this._getUrl(link)}
            title={title} closeCallback={this._closeIframe} githubLink={gitLink} usage={usage}/>
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
              margin: 40px auto;
            }
            :global(.indexer a) {
              color: ${LINK.FOREGROUND};
            }
            .container {
              max-width: 640px;
              margin: auto;
            }
            ul > :global(li) {
              padding: 10px 0;
            }
          `}
        </style>
      </div>
    );
  }
}

export default CreationList;
