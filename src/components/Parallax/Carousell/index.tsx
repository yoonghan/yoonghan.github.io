`use strict`

import * as React from "react";
import {LINK_COLOR} from "../../../shared/style";

interface IArticle {
  icon: string;
  title: string;
  description: string;
  href: string;
}

interface ICarousell {
  articles:Array<IArticle>;
  uniqueCarousellName: string;
}

const Carousell:React.FC<ICarousell> = ({articles, uniqueCarousellName}) => {
  const [description, setDescription] = React.useState(["", ""]);
  var observer:any = null;

  const _attachObserverForCarousell = () => {
    const options = {
      rootMargin: "0px 100px",
      threshold: 0.7
    };
    const callback = function(entries: Array<IntersectionObserverEntry>) {
      entries.forEach(function(entry) {
        if(entry.intersectionRatio >= 0.7) {
          const elem = entry.target as HTMLDivElement
          setDescription([`${elem.dataset.idx}`, `${elem.dataset.description}`])
        }
      })
    }
    observer = new IntersectionObserver(callback, options);
    document.querySelectorAll(`.${uniqueCarousellName}`).forEach((elem) => {
      observer.observe(elem);
    })
  }

  const _detachObserverForCarousell = () => {
    if(observer !== null) {
      document.querySelectorAll(`.${uniqueCarousellName}`).forEach((elem) => {
        observer.unobserve(elem);
      });
    }
  }

  React.useEffect(() => {
    _attachObserverForCarousell()
    return _detachObserverForCarousell
  }, []);

  const _click = (href:string) => () => {
    window.open(href, 'work')
  }

  const _getIdx = (idx:number) => `${uniqueCarousellName}-${idx}`

  const _drawArticle = () => {
    return articles.map((article, idx) => (
      <div key={`icarousell_${idx}_key`}
        onClick={_click(article.href)}
        className={`${uniqueCarousellName}`}
        data-description={article.description}
        data-idx={idx}
        id={_getIdx(idx)}
        >
        <div
          className="container">
          <i className={`fas ${article.icon}`}></i>
          <h4>{article.title}</h4>
        </div>
        <style jsx>{`
          .container {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 80vw;
            max-width: 800px;
            scroll-snap-align: start;
            padding: 2rem;
            border: 1px solid #FFF;
            background: #000;
            cursor: pointer;
          }
          i {
            font-size: 10rem;
          }
          `}</style>
      </div>
    ))
  }

  const _next = () => {
    const curr = parseInt(description[0], 10);
    if(curr < (articles.length - 1))
      location.href = `#${_getIdx(curr + 1)}`
  }

  const _prev = () => {
    const curr = parseInt(description[0], 10);
    if(curr > 0)
      location.href = `#${_getIdx(curr - 1)}`
  }

  return (
    <>
      <div className="container">
        {_drawArticle()}
      </div>
      <div className="section-description">
        <div className="idx">0{parseInt(description[0], 10)+1}</div>
        <div className="text">{description[1]}</div>
      </div>
      <div className="col">
        <div>{(parseInt(description[0], 10) !== 0) && <div className="arrow left" onClick={_prev}></div>}</div>
        <div><a href="/creation">View All</a></div>
        <div>{(parseInt(description[0], 10) !== articles.length - 1) && <div className="arrow right" onClick={_next}></div>}</div>
      </div>
      <style jsx>{`
        a {
          color: ${LINK_COLOR};
        }
        .container {
          scroll-snap-type: x mandatory;
          display: flex;
          overflow-x: scroll;
          position: relative;
          scroll-behavior: smooth;
          -webkit-overflow-scrolling: touch;
          width: 100%;
        }
        .section-description {
          position: relative;
          padding-left: 2rem;
        }
        .section-description > .idx{
          font-size: 5rem;
          color: red;
          font-weight: bold;
        }
        .section-description > .text {
          position: absolute;
          top: 2.5rem;
          background-color: rgba(0,0,0, 0.5);
          padding: 0 1rem 0.25rem 6.5rem;
          height: 1rem;
        }

        @media only screen and (max-width: 480px) {
          .section-description {
            display: flex;
            padding: 0;
          }
          .section-description > .text {
            padding: 0;
            position: relative;
          }
        }
        .col {
          align-items: center;
          display: flex;
          justify-content: row;
          justify-content: space-between;
          width: 100%;
        }
        .arrow {
          border: solid white;
          border-width: 0 6px 6px 0;
          padding: 6px;
          display: inline-block;
          margin: 1rem;
          cursor: pointer;
        }
        .arrow.left {
          transform: rotate(135deg);
        }
        .arrow.right {
          transform: rotate(-45deg);
        }
      `}</style>
    </>
  );
}

export default Carousell;
