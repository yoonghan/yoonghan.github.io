`use strict`
import * as React from "react";

const Footer: React.SFC<any> = () => {
  return (
    <footer>
      <span>Walcron</span> 2014-<span id="footer-year">2020</span> &copy;
    </footer>
  );
}

export default Footer;
