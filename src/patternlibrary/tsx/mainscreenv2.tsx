`use strict`

import * as React from "react";
import * as ReactDOM from "react-dom";

import { MainScreenV2 } from "./components/MainScreenV2";


const linkArray = {linkArray: [
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
]};

const mainScreenProps = {
  headerProps: linkArray,
  mainScreenV2Text: "A Simple Start Up Site",
  mainScreenV2ConceptText: "\"Inspired by the Ikigai Concept\"",
  mainScreenV2Description: "is a dedicated website created by Han & Lee Wan to represent their life as a programmer.",
  mainScreenV2BtnText: "Get to know me",
  mainScreenV2BtnLink: "/"
}

ReactDOM.render(
    <MainScreenV2 {...mainScreenProps}/>,
    document.getElementById("mainscreenv2")
);
