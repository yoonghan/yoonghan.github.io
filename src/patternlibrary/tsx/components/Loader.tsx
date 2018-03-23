`use strict`

import * as React from "react";
import { UtilLoader } from "../util/UtilLoader";

import '../../scss/base.scss';
var styles = require('../../scss/components/Loader.scss');

export class Loader extends React.PureComponent<{},{}> {
  constructor(props:any) {
    super(props);
  }

  render() {
    return (
      <div></div>
    );
  }
}
