`use strict`

import * as React from "react";

import '../../scss/base.scss';
var styles = require('../../scss/components/ImageOverlay.scss');

export interface ImageOverlayProp {
  imageSrc: string;
}

interface ImageOverlayState {
  isShown: boolean;
}

export class ImageOverlay extends React.PureComponent<ImageOverlayProp, ImageOverlayState> {
  constructor(props:any) {
    super(props);
    this.state = {
      isShown: false
    };
  }

  show() {
    this._setShown(true);
  }

  hide() {
    this._setShown(false);
  }

  _setShown = (isDisplay:boolean) => {
    this.setState(
      (prevState, props) => {
        return {
          isShown: isDisplay
        };
      }
    );
  }

  _displayElement = () => {
    if(this.state.isShown) {
      return (
        <div className={styles['image-overlay']} onClick={()=>this.hide()}>
          <div className={styles['image']} style={{backgroundImage: "url("+this.props.imageSrc+")"}}/>
        </div>
      );
    }
    else {
      return <div></div>
    }
  }

  render() {
    return (
      this._displayElement()
    );
  }
}
