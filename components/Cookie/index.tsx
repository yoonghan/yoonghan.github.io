`use strict`

/**
* Made for EUROPEAN regulation, but this site do not use cookies.
* For references, pages/* need to provide the context in getInitialProps and
* pass into the props.
**/

import * as React from "react";
import {COOKIEBOX} from "../../shared/style";

interface CookieProps {
  isClosed:boolean;
}


export const wasCookieRead = () => {
  const cookie = document.cookie;

  if(typeof cookie === "undefined") {
    return false;
  }

  const keyValues = cookie.split(";");
  const filterTermsValue = keyValues.filter(keyValue => {
    return keyValue.startsWith("termsRead");
  });

  return filterTermsValue && (filterTermsValue[0].split("=")[1] == "true");
}

const Cookie:React.FC<CookieProps> = (props) => {

  const [isClosed, setClosed] = React.useState(props.isClosed || false);

  const reactToCookieButton = () => {
    setClosed(true);
    saveCookieWithTerms();
  }

  const saveCookieWithTerms = () => {
    document.cookie = "termsRead=true";
  }

  if(isClosed) {
    return <React.Fragment/>;
  }

  return (
    <div className={"container"}>
      <div className={"message"}>
        <h4>This site uses cookie</h4>
        Your generated cookie, shall and will not be used for
        public sharing, activity or advertisement purposes and it is only
        saved in your local and private browser.
      </div>
      <div className={"button-container"}>
        <button onClick={reactToCookieButton}>Accept</button>
      </div>
      <style jsx>{`
        .container{
          height: 120px;
          width: 100%;
          bottom: 0;
          position: absolute;
          background-color: ${COOKIEBOX.BACKGROUND};
          color: ${COOKIEBOX.FOREGROUND};
          display: flex;
          padding: 5px 20px;
        }
        .message {
          width: 75%;
          font-size: 0.9rem;
          text-align: justify;
        }
        .button-container {
          width: 25%;
          text-align: center;
          align-self: center;
        }
        .button-container > button {
          padding: 20px 5px;
          border-radius: 5px;
          cursor: pointer;
        }
        @media only screen and (max-width: 480px) {
          .container{
            height: 150px;
            padding: 2px 10px;
          }
        }
      `}</style>
    </div>
  );
}

export default Cookie;
