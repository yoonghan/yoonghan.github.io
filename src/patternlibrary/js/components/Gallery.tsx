/**
*Rotating image background for Overlay Indicator is saved as based 64 in scss
**/

import * as React from "react";
import * as ReactDom from "react-dom";
import * as ReactTransitionGroup from "react-addons-transition-group";

import {Button} from 'react-toolbox/lib/button';

import '../../css/base';
var styles = require('../../css/components/Gallery');
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
  clickHandler:any;
  animLeft: number;
  animTop: number;
  items: Array<Item>;
  selectedIdx: number;
}

interface OverlayCardProps {
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

interface GalleryProps {
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

    this.setState({
      isOverlayOpen: !isOverlayOpen,
      clickPosLeft: posLeft,
      clickPosTop: posTop,
      selectedIdx: selectedIdx
    });
  };

  render() {
    return (
      <div className={styles.gallery}>
        <ReactTransitionGroup>
            {this.state.isOverlayOpen &&
              <Overlay clickHandler={this.toggleOverlay} animTop={this.state.clickPosTop} animLeft={this.state.clickPosLeft} items={this.props.items} selectedIdx={this.state.selectedIdx}/>}
        </ReactTransitionGroup>
        {this.createMoziacListing()}
      </div>
    );
  }
}

class Overlay extends React.Component<OverlayProps, {}> {

  static leaveTime = 100;

  handleClickHandler = () => {
    this.props.clickHandler();
  };

  componentWillEnter (callback:any) {
    setTimeout(function(){callback();}, Overlay.leaveTime);
  };

  componentDidEnter() {
    const el = ReactDom.findDOMNode(this);
    el.classList.add(styles['overlay-enter-active']);
  };

  componentWillLeave (callback:any) {
    const el = ReactDom.findDOMNode(this);
    el.classList.add(styles['overlay-leave-active']);
    setTimeout(function(){callback();}, Overlay.leaveTime);
  };

  render() {
    const {animLeft, animTop, items, selectedIdx} = this.props;
    return (
      <div className={styles.overlay}>
        <div className={styles['overlay-background']} onClick={this.handleClickHandler}></div>
        <OverlayCard animLeft={animLeft} animTop={animTop} clickHandler={this.handleClickHandler} items={items} selectedIdx={selectedIdx}/>
      </div>
    );
  }
}

class OverlayCard extends React.Component<OverlayCardProps, {}> {
  handleClickHandler = () => {
    this.props.clickHandler();
  };

  componentDidMount () {
    const el = ReactDom.findDOMNode(this) as HTMLElement;
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
      <div className={styles.overlaycard} style={animateStartPos}>
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
              <h5>Key Features</h5>
              <span>{key}</span>
            </div>
            <hr/>
            <div className={styles['overlaycard-content-desc']}>
              <h5>Description</h5>
              <span>{desc}</span>
            </div>
            <hr/>
          </div>
          <div className={styles['overlaycard-button']}>
            <Button icon='close' floating accent mini onClick={this.handleClickHandler}/>
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
    const angle = (Math.floor(180 / (total - 1)) * selection) - OverlayIndicator.imageAngleStart;
    const rotation = {transform: 'rotate(' + angle + 'deg)'};

    return (
      <div className={styles['overlaycard-bg-indicator']} style={rotation}></div>
    )
  }
}

class OverlayCardImageAnimated extends React.Component<OverlayCardAnimatedProps, {}> {
  static animation="jello";

  componentDidMount () {
    const el = ReactDom.findDOMNode(this);
    setTimeout(function(){
      el.classList.add(OverlayCardImageAnimated.animation);
    },
    Overlay.leaveTime);
  }

  render() {
    const {imgSrc} = this.props;

    return (
      <img src={imgSrc} className="animated"/>
    )
  }
}

class Moziac extends React.Component<MoziacProps, {}> {
  handleClickHandler = () => {
    const el = ReactDom.findDOMNode(this);
    const posTop = el.getBoundingClientRect().top;
    const posLeft = el.getBoundingClientRect().left;
    this.props.clickHandler(posTop, posLeft, this.props.idx);
  };

  render() {
    const {title, imgSrc} = this.props;
    return (
      <div className={styles.moziac} onClick={this.handleClickHandler}>
        <img className={styles['moziac-image']} src={imgSrc}></img>
        <div className={styles['moziac-title']}>{title}</div>
      </div>
    );
  }
}
