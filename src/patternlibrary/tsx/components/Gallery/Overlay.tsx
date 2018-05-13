`use strict`
import * as React from "react";
import {Button} from 'react-toolbox/lib/button';

import {Item} from './Const';
import {OverlayCard} from './OverlayCard';

import '../../../scss/base.scss';
var styles = require('../../../scss/components/Gallery.scss');
declare function require(path: string): any;

interface OverlayProps {
  isSubComponentToUpdate: boolean;
  transitionStyles: any;
  clickHandler:any;
  animLeft: number;
  animTop: number;
  items: Array<Item>;
  selectedIdx: number;
}

export class Overlay extends React.Component<OverlayProps, {}> {
  private node:HTMLElement;

  _handleClickHandler = () => {
    this.props.clickHandler();
  };

  shouldComponentUpdate() {
    return true;
  }

  render() {
    const {animLeft, animTop, items, selectedIdx, isSubComponentToUpdate} = this.props;
    return (
      <div ref={node => this.node = node} className={styles.overlay} style={{...this.props.transitionStyles}}>
        <div className={styles['overlay-background']} onClick={this._handleClickHandler}></div>
        <OverlayCard
          animLeft={animLeft}
          animTop={animTop}
          clickHandler={this._handleClickHandler}
          items={items}
          selectedIdx={selectedIdx}
          isComponentUpdated={isSubComponentToUpdate}/>
      </div>
    );
  }
}
