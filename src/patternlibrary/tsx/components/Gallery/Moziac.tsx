`use strict`
import * as React from "react";

import '../../../scss/base.scss';
var styles = require('../../../scss/components/Gallery.scss');
declare function require(path: string): any;

interface MoziacProps {
  imgSrc: string;
  title: string;
  idx: number;
  clickHandler:any;
}

export class Moziac extends React.PureComponent<MoziacProps, {}> {
  private node:HTMLElement;

  _handleClickHandler = () => {
    const el = this.node;
    const posTop = el.getBoundingClientRect().top;
    const posLeft = this.adjustedLeft(el.getBoundingClientRect().left);
    this.props.clickHandler(posTop, posLeft, this.props.idx);
  };

  adjustedLeft = (posLeft:number) => {
    const windowWidth = window.innerWidth || document.documentElement.clientWidth;
    const adjWindowWidth = Math.floor(windowWidth/2);
    if(posLeft > adjWindowWidth) {
      return adjWindowWidth;
    }
    return posLeft;
  };

  render() {
    const {title, imgSrc} = this.props;
    return (
      <div ref={node => this.node=node} className={styles.moziac} onClick={this._handleClickHandler}>
        <img className={styles['moziac-image']} src={imgSrc}></img>
        <div className={styles['moziac-title']}>{title}</div>
      </div>
    );
  }
}
