`use strict`

import * as React from "react";
import * as ReactDOM from "react-dom";

import { ProgressiveButton } from "./components/ProgressiveButton";

const prop = {
  ready: 'Install Now',
  notsupported: 'Browser Not Supported',
  installing: 'Installing',
  installed: 'Installed and Ready',
  alreadyInstalled: 'Already Installed',
  updating: 'Updating Service Worker',
  failed: 'Failed / Retry'
}

ReactDOM.render(
    <ProgressiveButton {...prop}/>,
    document.getElementById("progressivebutton")
);
