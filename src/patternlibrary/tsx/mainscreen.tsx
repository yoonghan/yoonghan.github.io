`use strict`

import * as React from "react";
import * as ReactDOM from "react-dom";

import { MainScreen } from "./components/MainScreen";

const tech = [
      {text:'ReactJS', link:'https://facebook.github.io/react/'},
      {text:'Typescript 2.1', link:'https://www.typescriptlang.org/'},
      {text:'NodeJS', link:'https://nodejs.org/en/'},
      {text:'SASS', link:'http://sass-lang.com/'},
      {text:'Webpack', link:'https://webpack.github.io/'},
      {text:'Font Awesome', link:'http://fontawesome.io'},
      {text:'Gulp', link:'http://gulpjs.com/'}
      ];

ReactDOM.render(
    <MainScreen itemArray={tech}/>,
    document.getElementById("mainscreen")
);
