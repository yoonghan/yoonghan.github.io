`use strict`

import * as React from "react";
import NoSSR from 'react-no-ssr';
import NoSSRNavMenu from "./NoSSRNavMenu";

const NavMenu: React.SFC = ({}) => {
  return (
    <NoSSR>
      <NoSSRNavMenu/>
    </NoSSR>
  );
}

export default NavMenu;
