import React from "react";
import ReactDOM from "react-dom";
import Button from "../Button";
import MiniIframe from "./MiniIframe";

interface ICardDescription {
  desc: string;
  title: string;
  callbackClose: () => void;
  link: string;
  gitLink?: string;
  usage?: string;
  internal?:boolean;
}

const clickArticle = (props:ICardDescription, showIframe:()=> void) => () => {
  if(props.internal) {
    window.location.href = props.link;
    return;
  }
  showIframe();
  window.scrollTo(0,0);
}

const getUrl = (url:string) => {
  return `/static/host/${url}/`;
}

const renderIframe = (props:ICardDescription, closeIframe:()=>void) => {
  const {link, title, gitLink, usage} = props;
  return <MiniIframe iframeLink={getUrl(link)}
        title={title} closeCallback={closeIframe} githubLink={gitLink} usage={usage}/>
}

const renderDescription = (props:ICardDescription, showIframe:()=>void) => (
  <React.Fragment>
    <div className={"close"} onClick={props.callbackClose}>X</div>
    <section>
      <h3>{props.title}</h3>
      <article>
        {props.desc}
      </article>
      <div className={"gap"}>
        <Button onClickCallback={clickArticle(props, showIframe)} invert={true}>
          View
        </Button>
      </div>
    </section>
    <style jsx>{`
      .close {
        background-color: #222;
        color: #FFF;
        cursor: pointer;
        width: 40px;
        height: 40px;
        border-radius: 40px;
        position: absolute;
        top: -20px;
        right: -20px;
        text-align: center;
        border: 1px solid #FFF;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .gap {
        margin-top: 20px;
      }
    `}</style>
  </React.Fragment>
)

const onClickStopBubblingCall = (event:React.MouseEvent<HTMLDivElement, MouseEvent>) => {
  event.stopPropagation();
}

const renderContainer = (props:ICardDescription, showIframe:boolean, setShowIframe:(c:boolean)=>any) => {
  return (
    <div className={"outer-container"} onClick={props.callbackClose}>
      <div className={"container"} onClick={onClickStopBubblingCall}>
        {showIframe && renderIframe(props, () => {setShowIframe(false)})}
        {!showIframe && renderDescription(props, () => {setShowIframe(true)})}
      </div>
      <style jsx>{`
        .outer-container {
          position: absolute;
          background-color: rgba(0,0,0, 0.5);
          top: 0;
          bottom: 0;
          transition: unset;
          transform: unset;
          left: 0;
          right: 0;
          z-index: 999;
        }
        .container {
          top: 50%;
          left: 50%;
          min-width: 240px;
          transform: translate(-50%, -50%);
          padding: 50px;
          position: absolute;
          background: ${showIframe? "#000": "#FFF"};
          border: 1px solid #000;
          color: ${showIframe? "#FFF": "#000"};
        }
      `}</style>
    </div>
  )
}

/**
 Do not require to manually to do unmounting of elements attached to modal-root.
 It is already handled by react. If there is (modal-root).removeChild(document.querySelector("#modal-root > div")),
 and exception will be generated as the div has already been removed.
**/
const CardDescription: React.SFC<ICardDescription> = (props) => {
  const [showIframe, setShowIframe] = React.useState(false);

  return ReactDOM.createPortal(
        renderContainer(props, showIframe, setShowIframe),
        document.getElementById('modal-root')!
      );
}

export default CardDescription;
