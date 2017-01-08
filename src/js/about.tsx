import * as React from "react";
import * as ReactDOM from "react-dom";

import { AboutHeader, AboutFooter } from "./components/About";

ReactDOM.render(
   <AboutHeader />,
    document.getElementById("aboutHeader")
);

ReactDOM.render(
   <AboutFooter />,
    document.getElementById("aboutFooter")
);
