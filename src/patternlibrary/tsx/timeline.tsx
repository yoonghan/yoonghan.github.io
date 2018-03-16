`use strict`

import * as React from "react";
import * as ReactDOM from "react-dom";

import { Timeline } from "./components/Timeline";

const timelines = [
  { year: 2016},
  {
    title: "Test",
    image: "https://placeimg.com/640/250/tech",
    description: "Description",
    linkArray: [
      {
        text: "text",
        path: "path"
      }
    ]
  },
  {
    title: "Test",
    image: "https://placeimg.com/640/250/tech",
    description: "Description",
    linkArray: [
      {
        text: "text",
        path: "path"
      }
    ]
  }
];

ReactDOM.render(
    <Timeline postArray = {timelines}/>,
    document.getElementById("timeline")
);
