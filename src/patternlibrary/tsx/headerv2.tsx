`use strict`

import * as React from "react";
import * as ReactDOM from "react-dom";

import { HeaderV2 } from "./components/HeaderV2";

const linkArray = [
  {
    title: "About",
    icon: "question",
    path: "about"
  },
  {
    title: "Blog",
    icon: "file-text-o",
    path: "blog"
  }
];

ReactDOM.render(
    <HeaderV2 linkArray={linkArray}/>,
    document.getElementById("headerv2")
);
