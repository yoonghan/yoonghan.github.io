`use strict`

import * as React from "react";
import HeaderOne from "../HeaderOne";
import Footer from "../Footer";

const NoJavascript: React.SFC<any> = () => {

  return (
    <>
      <section className="container">
        <HeaderOne title="Walcron" isLined={true}/>
        <div>
        I know you are cool and so on, but this site ain't cool without Javascript.
        If you still want to proceed without javascript, please visit us here.
        </div>
        <div>
          <a className="button" href="/about">About Us</a>
        </div>
      </section>
      <style jsx>{`
        .container {
          padding-top: 5rem;
        }
        div {
          padding: 2rem;
          text-align: center;
        }
        a {
          text-decoration: none;
          padding: 1rem;
          position: relative;
          background: rgba(200,200,200,0.1);
          transition-property: color, background;
          transition-duration: .15s;
          transition-timing-function: ease-in-out;
          color: #FFF;
          font-size: 1rem;
          text-align: center;
          border-radius: 0.5rem;
          font-weight: bold;
          cursor: pointer;
          border: 1px solid;
          margin: 0 1px 1px 0;
          user-select: none;
          white-space: nowrap;
          box-shadow: 0 2px 2px 0 rgba(22,22,22,0.14), 0 1px 5px 0 rgba(22,22,22,0.12), 0 3px 1px -2px rgba(22,22,22,0.2)
        }
        a:hover {
          background: #FFF;
          color: #000;
        }
        a:active {
          margin: 1px 0 0 1px;
        }
      `}</style>
      <Footer isRelative={false}/>
    </>
  )
}

export default NoJavascript
