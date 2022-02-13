`use strict`
import * as React from "react";

interface IFooter {
  isRelative?:boolean;
}

const Footer: React.SFC<IFooter> = ({isRelative}) => {
  return (
    <footer style={isRelative?{'position':'relative'}: {}}>
      <span>Walcron</span> 2014-<span id="footer-year">2022</span> &copy;
    </footer>
  );
}

export default Footer;
