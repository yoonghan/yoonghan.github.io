`use strict`
import * as React from "react";

import {LEAVE_TIME} from './Item';

import '../../../scss/base.scss';
var styles = require('../../../scss/components/Gallery.scss');
declare function require(path: string): any;

interface OverlayCardAnimatedProps {
  imgSrc: string;
}

export class OverlayCardImageAnimated extends React.PureComponent<OverlayCardAnimatedProps, {}> {
  private animation = "jello";
  private node:HTMLElement;

  componentDidMount () {
    const el = this.node;
    setTimeout(function(){
      el.classList.add(this.animation);
    },
    LEAVE_TIME);
  }

  render() {
    const {imgSrc} = this.props;

    return (
      <img src={imgSrc} className="animated" ref={node => this.node=node}/>
    )
  }
}
