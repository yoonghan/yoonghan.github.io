`use strict`

import * as React from "react";
import * as ReactDOM from "react-dom";

import { Midpart } from "./components/Midpart";

const displayMessage = [
  {
    header: 'pattern 1',
    description: 'Lorem ipsum tolouse moutrang, ascdec toure aute'
  },
  {
    header: 'pattern 2',
    description: 'Lorem ipsum tolouse moutrang, ascdec toure aute'
  },
  {
    header: 'pattern 3',
    description: 'Lorem ipsum tolouse moutrang, ascdec toure aute'
  }
];

ReactDOM.render(
    <Midpart conceptArray={displayMessage}/>,
    document.getElementById("midpart")
);
