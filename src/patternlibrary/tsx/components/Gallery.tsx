`use strict`

/**
*Rotating image background for Overlay Indicator is saved as based 64 in scss
**/

import * as React from "react";
import {Button} from 'react-toolbox/lib/button';
import {Transition} from 'react-transition-group';

import '../../scss/base';
var styles = require('../../scss/components/Gallery');
declare function require(path: string): any;

interface GalleryState {
  isOverlayOpen: boolean;
  clickPosLeft: number;
  clickPosTop: number;
  selectedIdx: number;
}

interface MoziacProps {
  imgSrc: string;
  title: string;
  idx: number;
  clickHandler:any;
}

interface OverlayProps {
  isSubComponentToUpdate: boolean;
  transitionStyles: any;
  clickHandler:any;
  animLeft: number;
  animTop: number;
  items: Array<Item>;
  selectedIdx: number;
}

interface OverlayCardProps {
  isComponentUpdated: boolean;
  clickHandler:any;
  animLeft: number;
  animTop: number;
  items: Array<Item>;
  selectedIdx: number;
}

interface OverlayCardAnimatedProps {
  imgSrc: string;
}

interface OverlayIndicatorProps {
  total: number;
  selection: number;
}

export interface GalleryProps {
  items: Array<Item>;
}

export interface Item {
  title: string;
  imgSrc: string;
  nature: Array<string>;
  key: string;
  desc: string;
}

export class Gallery extends React.Component<GalleryProps, GalleryState> {

  private transitionStyles:any = {
    entering: {opacity:0},
    entered: {opacity:1},
    exiting: {opacity: 0, transition: 'opacity ' + Overlay.leaveTime + 'ms ease-in'}
  };

  constructor(props:any) {
    super(props);
    this.state = {
      isOverlayOpen: false,
      clickPosLeft: 0,
      clickPosTop: 0,
      selectedIdx: 0
    };
  };

  createMoziacListing = ():JSX.Element[] => {
    const moziacListing = this.props.items;

    let idx = 0;
    return moziacListing.map(
      (moziac) =>{
        return (
          <Moziac clickHandler={this.toggleOverlay} imgSrc={moziac.imgSrc} title={moziac.title} key={moziac.title} idx={idx++}></Moziac>
        );
      }
    );
  }

  toggleOverlay = (posTop:number = 0, posLeft:number = 0, selectedIdx:number = 0) => {
    const {isOverlayOpen} = this.state;

    this.setState(
      (prevState, props) => {
        return {
          isOverlayOpen: !isOverlayOpen,
          clickPosLeft: posLeft,
          clickPosTop: posTop,
          selectedIdx: selectedIdx
        };
      }
    );
  };

  render() {



    return (
      <div className={styles.gallery}>
            <Transition in={this.state.isOverlayOpen} timeout={Overlay.leaveTime} appear={this.state.isOverlayOpen}>
            {
              (state:any) =>
                {
                  if(state === 'exited') {
                    return null;
                  }

                  return (
                      <Overlay
                        transitionStyles={...this.transitionStyles[state]}
                        clickHandler={this.toggleOverlay}
                        animTop={this.state.clickPosTop}
                        animLeft={this.state.clickPosLeft}
                        items={this.props.items}
                        selectedIdx={this.state.selectedIdx}
                        isSubComponentToUpdate={state==='entering'}/>
                  );
                }
            }
            </Transition>
        {this.createMoziacListing()}
      </div>
    );
  }
}

class Overlay extends React.Component<OverlayProps, {}> {
  private node:HTMLElement;
  static leaveTime = 100;

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

class OverlayCard extends React.Component<OverlayCardProps, {}> {
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
    Overlay.leaveTime);
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

class OverlayIndicator extends React.Component<OverlayIndicatorProps, {}> {

  static imageAngleStart = 90;

  render() {
    const {total, selection} = this.props;
    const adjTotal = total - 1;
    const angle = Math.floor(180 / adjTotal * selection);
    const adjAngle = angle - OverlayIndicator.imageAngleStart;
    const degInRad = angle * (Math.PI / 180.0);
    const translateY = (Math.sin(degInRad) * 140 * -1) - 20;
    const translateX = ((Math.cos(degInRad) * 140) - 140) * -1;
    const rotation = {transform: 'translate(' +translateX + 'px,' + translateY + 'px) rotate(' + adjAngle + 'deg)'};

    return (
      <div className={styles['overlaycard-bg-big']}>
        <div className={styles['overlaycard-bg-indicator']} style={rotation}>
        </div>
      </div>
    )
  }
}

class OverlayCardImageAnimated extends React.Component<OverlayCardAnimatedProps, {}> {
  private animation = "jello";
  private node:HTMLElement;

  componentDidMount () {
    const el = this.node;
    setTimeout(function(){
      el.classList.add(this.animation);
    },
    Overlay.leaveTime);
  }

  render() {
    const {imgSrc} = this.props;

    return (
      <img src={imgSrc} className="animated" ref={node => this.node=node}/>
    )
  }
}

class Moziac extends React.Component<MoziacProps, {}> {
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
