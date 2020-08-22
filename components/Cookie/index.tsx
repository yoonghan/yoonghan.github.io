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
        <h4>This site uses cookies.</h4>
        <p>Your generated cookie, shall and will not be used for
        any public sharing or advertisement related purposes. The cookie is only
        saved in your local and private browser to monitor visits and usage traffics.</p>
        <p>By proceeding on this website, you have indirectly accepted and agreed to our cookie usage.</p>
      </div>
      <div className={"button-container"}>
        <button onClick={reactToCookieButton} >Close</button>
      </div>
      <style jsx>{`
        .container{
          width: 100%;
          bottom: 0;
          position: fixed;
          background-color: ${COOKIEBOX.BACKGROUND};
          color: ${COOKIEBOX.FOREGROUND};
          display: flex;
          padding: 20px;
        }
        .message {
          width: 75%;
          font-size: 0.9rem;
        }
        .button-container {
          width: 25%;
          text-align: center;
          align-self: center;
        }
        .button-container > button {
          border-radius: 5px;
          cursor: pointer;
          padding: 1rem;
          background-color: ${COOKIEBOX.FOREGROUND};
          color: ${COOKIEBOX.BACKGROUND};
          font-weight: bold;
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
