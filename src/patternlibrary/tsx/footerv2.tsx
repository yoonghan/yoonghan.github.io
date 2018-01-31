`use strict`

import * as React from "react";
import * as ReactDOM from "react-dom";

import { FooterV2 } from "./components/FooterV2";

const links = [
  {
    text: 'About',
    path: '/about'
  },
  {
    text: 'Test',
    path: '/test'
  }
];

ReactDOM.render(
    <FooterV2 updatedYear={2018} linkArray={links} contactInformation={'Shit just got better.'}/>,
    document.getElementById("footerv2")
);
