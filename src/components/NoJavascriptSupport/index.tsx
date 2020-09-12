`use strict`

import * as React from "react";
import NoJavascript from "./NoJavascript";

const NoJavascriptInverse: React.SFC<any> = ({children}) => {
  const javascriptRunElement = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if(javascriptRunElement.current !== null) {
      javascriptRunElement.current.style.display='block'
    }
  }, []);

  return (
    <>
      <NoJavascript />
      <section ref={javascriptRunElement} className="container">
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
