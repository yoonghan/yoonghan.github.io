`use strict`

import * as React from "react";
import * as ReactDOM from "react-dom";

import { LocaleSelector, LocaleSelectorTypes } from "./components/LocaleSelector";

ReactDOM.render(
    <LocaleSelector type={LocaleSelectorTypes.Dropdown}/>,
    document.getElementById("localeselector")
);

ReactDOM.render(
    <LocaleSelector type={LocaleSelectorTypes.Link}/>,
    document.getElementById("localeselector2")
);
