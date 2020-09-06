`use strict`

import * as React from "react";

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
  const [description, setDescription] = React.useState([0, ""]);
  var observer = null;

  const _attachObserverForCarousell = () => {
    const options = {
      rootMargin: "0px 100px",
      threshold: 0.7
    };
    const callback = function(entries: Array<IntersectionObserverEntry>) {
      entries.forEach(function(entry) {
        if(entry.intersectionRatio >= 0.7) {
          setDescription([`0${entry.target.dataset.idx}`, entry.target.dataset.description])
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

  const _click = (href) => {
    window.open(href, 'work')
  }

  const _drawArticle = () => {
    return articles.map((article, idx) => (
      <div key={`icarousell_${idx}_key`}
        onClick={_click(article.href)}
        className={`${uniqueCarousellName}`}
        data-description={article.description}
        data-idx={idx + 1}
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

  return (
    <>
      <div className="container">

        {_drawArticle()}
      </div>

        <div className="col">
          <div><div className="arrow left"></div></div>
          <div><div className="arrow right"></div></div>
        </div>
      <div className="section-description">
        <div className="idx">{description[0]}</div>
        <div className="text">{description[1]}</div>
      </div>
      <style jsx>{`
        .container {
          scroll-snap-type: x mandatory;
          display: flex;
          overflow-x: scroll;
          position: relative;
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
          display: flex;
          justify-content: row;
          justify-content: space-between;
          position: absolute;
          width: 100%;
          bottom: 40%;
        }
        .arrow {
          border: solid white;
          border-width: 0 8px 8px 0;
          padding: 8px;
          display: inline-block;
          animation-duration: 1.5s;
          animation-iteration-count: infinite;
          animation-name: blink;
          margin: 2rem;
        }
        .arrow.left {
          transform: rotate(135deg);
        }
        .arrow.right {
          transform: rotate(-45deg);
        }
        @keyframes blink {
            0% {
                opacity: 0.5;
            }
            50% {
                opacity: 1;
            }
            100% {
                opacity: 0;
            }
        }
      `}</style>
    </>
  );
}

export default Carousell;
