import * as React from "react";
import * as ReactDom from "react-dom";
import * as ReactTransitionGroup from "react-addons-transition-group";

import '../../css/base';
var styles = require('../../css/components/Gallery');
declare function require(path: string): any;

interface GalleryState {
  isOverlayOpen: boolean;
  clickPosLeft: number;
  clickPosTop: number;
}

interface MoziacProps {
  clickHandler:any;
}

interface OverlayProps {
  clickHandler:any;
  animLeft: number;
  animTop: number;
}

interface OverlayCardProps {
  animLeft: number;
  animTop: number;
}

export class Gallery extends React.Component<{}, GalleryState> {
  constructor(props:any) {
    super(props);
    this.state = {
      isOverlayOpen: false,
      clickPosLeft: 0,
      clickPosTop: 0
    };
  };

  toggleOverlay = (posTop:number = 0, posLeft:number = 0) => {
    const {isOverlayOpen} = this.state;

    this.setState({
      isOverlayOpen: !isOverlayOpen,
      clickPosLeft: posLeft,
      clickPosTop: posTop
    });
  };

  render() {
    return (
      <div className={styles.gallery}>

        <ReactTransitionGroup>
            {this.state.isOverlayOpen && <Overlay clickHandler={this.toggleOverlay} animTop={this.state.clickPosTop} animLeft={this.state.clickPosLeft}/>}
        </ReactTransitionGroup>
        <Moziac clickHandler={this.toggleOverlay}></Moziac>
        <Moziac clickHandler={this.toggleOverlay}></Moziac>
        <Moziac clickHandler={this.toggleOverlay}></Moziac>
        <Moziac clickHandler={this.toggleOverlay}></Moziac>
        <Moziac clickHandler={this.toggleOverlay}></Moziac>
        <Moziac clickHandler={this.toggleOverlay}></Moziac>
        <Moziac clickHandler={this.toggleOverlay}></Moziac>
        <Moziac clickHandler={this.toggleOverlay}></Moziac>
        <Moziac clickHandler={this.toggleOverlay}></Moziac>
        <Moziac clickHandler={this.toggleOverlay}></Moziac>
        <Moziac clickHandler={this.toggleOverlay}></Moziac>
        <Moziac clickHandler={this.toggleOverlay}></Moziac>
      </div>
    );
  }
}

class Overlay extends React.Component<OverlayProps, {}> {

  static leaveTime = 100;
  static heightAllow = 480;

  componentDidMount () {
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;

    console.log("??"+windowHeight + "," + Overlay.heightAllow);
    if(windowHeight > Overlay.heightAllow) {
      document.body.style.overflow = 'hidden';
    }
  }

  componentWillUnmount () {
    document.body.style.overflow = '';
  }

  handleClickHandler = () => {
    this.props.clickHandler();
  };

  componentWillEnter (callback:any) {
    const el = ReactDom.findDOMNode(this);
    el.classList.add(styles['overlay-enter']);
    setTimeout(function(){callback();}, Overlay.leaveTime);
  }

  componentDidEnter() {
    const el = ReactDom.findDOMNode(this);
    el.classList.add(styles['overlay-enter-active']);
  }

  componentWillLeave (callback:any) {
    const el = ReactDom.findDOMNode(this);
    el.classList.add(styles['overlay-leave-active']);
    setTimeout(function(){callback();}, Overlay.leaveTime);
  }

  render() {
    const {animLeft, animTop} = this.props;
    return (
      <div className={styles.overlay}>
        <div className={styles['overlay-background']} onClick={this.handleClickHandler}></div>
        <OverlayCard animLeft={animLeft} animTop={animTop}/>
      </div>
    );
  }
}

class OverlayCard extends React.Component<OverlayCardProps, {}> {
  componentDidMount () {
    const el = ReactDom.findDOMNode(this) as HTMLElement;
    setTimeout(function(){
      const windowTopPos = window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      const docHeight = document.body.clientHeight;
      if(windowTopPos < (docHeight - Overlay.heightAllow)) {
        el.style.top = (windowTopPos + 10) + "px";
      }
      else {
        window.scrollTo( 0, 0);
        el.style.top = "10px";
      }
      el.style.minHeight = Overlay.heightAllow + 'px';
      el.style.left = "50%";
    },
    Overlay.leaveTime);
  }

  render() {
    const {animLeft, animTop} = this.props;
    const animateStartPos = (animLeft && animTop) ? {top: animTop, left:animLeft} : {};
    return (
      <div className={styles.overlaycard} style={animateStartPos}></div>
    );
  }
}

class Moziac extends React.Component<MoziacProps, {}> {
  handleClickHandler = () => {
    const el = ReactDom.findDOMNode(this);
    const posTop = el.getBoundingClientRect().top;
    const posLeft = el.getBoundingClientRect().left;
    this.props.clickHandler(posTop, posLeft);
  };

  render() {
    return (
      <div className={styles.moziac} onClick={this.handleClickHandler}>
        <img className={styles['moziac-image']} src="/ext/img/about/gladys.jpg"></img>
        <div className={styles['moziac-title']}>React JS</div>
      </div>
    );
  }
}
