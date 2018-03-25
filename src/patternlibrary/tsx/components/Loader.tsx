`use strict`

import * as React from "react";
import { Preloader } from "./Preloader";

export class Loader extends React.PureComponent<{},{}> {
  constructor(props:any) {
    super(props);
  }

  render() {
    return (
      <Preloader/>
    );
  }
}
