`use strict`

import * as React from "react";
import * as ReactDOM from "react-dom";

import { MenuDropV2 } from "./components/MenuDropV2";

const menuItems = [
  {path: '#', title:'BLOG' , icon:'camera-retro'},
  {path: '#', title:'PORTFOLIO' , icon:'superpowers'}
];

ReactDOM.render(
    <MenuDropV2 linkArray={menuItems}/>,
    document.getElementById("menudropv2")
);
