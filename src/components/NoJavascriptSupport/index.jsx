`use strict`

import * as React from "react";
import NoJavascript from "./NoJavascript";

const NoJavascriptInverse = ({noScriptElem, children}) => {
  const javascriptRunElement = React.useRef(null);

  React.useEffect(() => {
    if(javascriptRunElement.current !== null && !_isDevEnvironment()) {
      javascriptRunElement.current.style.display='block'
    }
  }, []);

  const _renderNoJavascript = () => {
    if(noScriptElem) {
      return noScriptElem;
    }
    return <NoJavascript />;
  }

  /**Required -  else nextjs will hang if hot-reload keeps running. Crash with inner javascript**/
  const _isDevEnvironment = () => {
    return process.env === 'DEVELOPMENT';
  }

  return (
    <>
      {
        !_isDevEnvironment() && (
          <noscript>
          {_renderNoJavascript()}
          </noscript>
        )
      }
      <section ref={javascriptRunElement} className={!_isDevEnvironment()?"container":""}>
        {children}
        <style jsx>{`
          .container {
            display: none;
          }
        `}</style>
      </section>
    </>
  );
}

export default NoJavascriptInverse
