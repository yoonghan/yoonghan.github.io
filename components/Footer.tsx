`use strict`
import * as React from "react";

const Footer: React.SFC<any> = () => {
  return (
    <footer>
      <span>Walcron</span> 2014-2020 &copy;
    <style jsx>{`
      footer {
        font-size: 0.8rem;
        bottom: 0px;
        left: 0px;
        margin: 10px;
        position: absolute;
        width: 320px;
      }
    `}</style>
    </footer>
  );
}

export default Footer;
