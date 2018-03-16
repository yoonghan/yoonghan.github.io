`use strict`
import * as React from "react";
import {Button} from 'react-toolbox/lib/button';

import {LEAVE_TIME, Item} from './Item';
import {OverlayIndicator} from './OverlayIndicator';
import {OverlayCardImageAnimated} from './OverlayCardImageAnimated';

import '../../../scss/base.scss';
var styles = require('../../../scss/components/Gallery.scss');
declare function require(path: string): any;

interface OverlayCardProps {
  isComponentUpdated: boolean;
  clickHandler:any;
  animLeft: number;
  animTop: number;
  items: Array<Item>;
  selectedIdx: number;
}

export class OverlayCard extends React.Component<OverlayCardProps, {}> {
  private node:HTMLElement;

  shouldComponentUpdate() {
    return this.props.isComponentUpdated;
  }

  _handleClickHandler = () => {
    this.props.clickHandler();
  };

  componentDidMount () {
    const el = this.node;
    const heightAllow = el.getBoundingClientRect().height + 10;
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;

    if(windowHeight > heightAllow) {
      document.body.style.overflow = 'hidden';
    }

    setTimeout(function(){
      const windowTopPos = window.pageYOffset || document.documentElement.scrollTop;
      const docHeight = document.body.clientHeight;
      const scrollableHeight = (docHeight - heightAllow) > 0 ? (docHeight - heightAllow) : 0;
      if(windowTopPos < scrollableHeight) {
        let allowedHeight = windowHeight - heightAllow;
        el.style.top = (windowTopPos + (allowedHeight>0 ? allowedHeight/2 : 0)) + "px";
      }
      else {
        window.scrollTo( 0, scrollableHeight);
        el.style.top = "";
        el.style.bottom = "0";
      }
      el.style.minHeight = heightAllow + 'px';
      el.style.left = "50%";
    },
    LEAVE_TIME);
  }


  componentWillUnmount () {
    document.body.style.overflow = '';
  }

  createKeyFeatures = () => {
    const {nature} = this.props.items[this.props.selectedIdx];

    return nature.map(
      (natureItem) => {
        return <div key={natureItem}><i className="fa fa-check-circle-o" aria-hidden="true"></i> {natureItem}</div>
      }
    );

  }

  render() {
    const {animLeft, animTop, items, selectedIdx} = this.props;
    const {title, imgSrc, nature, key, desc} = items[selectedIdx];
    const animateStartPos = (animLeft && animTop) ? {top: animTop, left:animLeft} : {};
    return (
      <div ref={node => this.node=node} className={styles.overlaycard} style={animateStartPos}>
        <div className={styles['overlaycard-bg']}>
          <OverlayIndicator total={items.length} selection={selectedIdx}/>
        </div>
        <div className={styles['overlaycard-image']}>
          <div className={styles['overlaycard-image-adj']}>
            <OverlayCardImageAnimated imgSrc={imgSrc}/>
          </div>
        </div>
        <div className={styles['overlaycard-placement']}>
          <div className={styles['overlaycard-content']}>
            <h2>{title}</h2>
            <div className={styles['overlaycard-content-features']}>
              {this.createKeyFeatures()}
            </div>
            <hr/>
            <div className={styles['overlaycard-content-keyfeature']}>
              <h4>Key Features</h4>
              <span>{key}</span>
            </div>
            <hr/>
            <div className={styles['overlaycard-content-desc']}>
              <h4>Description</h4>
              <span>{desc}</span>
            </div>
            <hr/>
          </div>
          <div className={styles['overlaycard-button']}>
            <Button icon='close' floating accent mini onClick={this._handleClickHandler}/>
          </div>
        </div>
      </div>
    );
  }
}
