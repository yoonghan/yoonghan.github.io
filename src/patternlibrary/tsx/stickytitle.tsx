`use strict`

import * as React from "react";
import * as ReactDOM from "react-dom";

import { StickyTitle } from "./components/StickyTitle";

ReactDOM.render(
    <StickyTitle text="Research" pos={0} />,
    document.getElementById("stickyTitle")
);

ReactDOM.render(
    <StickyTitle text="Blog" pos={1} />,
    document.getElementById("stickyTitle_2")
);
