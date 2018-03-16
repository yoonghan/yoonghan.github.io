`use strict`

import * as React from "react";
import * as ReactDOM from "react-dom";

import { ImageOverlay } from "./components/ImageOverlay";

class Sample extends React.PureComponent<{},{}> {
  constructor(props:any) {
    super(props);
  }

  _toggleImage = () => {
    const imageOverlayRef = this.refs.overlayRef as ImageOverlay;
    imageOverlayRef.show();
  }

  render() {
    return (
      <div>
        <div onClick={this._toggleImage} ref="clickRef">Toggle Image On and Off</div>
        <ImageOverlay ref="overlayRef" imageSrc={'/ext/img/bg/background_type1.jpg'}/>
      </div>
    );
  }
}

ReactDOM.render(
    <Sample/>,
    document.getElementById("imageoverlay")
);
