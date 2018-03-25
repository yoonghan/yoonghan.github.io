`use strict`

import * as React from "react";

import { UtilLoader } from "../util/UtilLoader";

var styles = require('../../scss/components/Preloader.scss');
declare function require(path: string): any;

export class Preloader extends React.PureComponent<{}, {}> {

  constructor(props:any) {
    super(props);
    new UtilLoader().startDisplay();
  }

  render() {
    return(
      <div></div>
    );
  }
}
