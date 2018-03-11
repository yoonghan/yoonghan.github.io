`use strict`

import * as React from "react";
import * as Trianglify from "trianglify";
import {Button} from 'react-toolbox/lib/button';

import '../../scss/base';
var styles = require('../../scss/components/MainScreenV2');
declare function require(path: string): any;

interface TrianglifyCanvasState {
  height?: number;
  width?: number;
  resize_timer?: any;
}

interface TrianglifyCanvasProps {
  className: string;
}

export interface MainScreenV2Props {
  mainScreenV2Text: string,
  mainScreenV2ConceptText: string,
  mainScreenV2Description: string,
  mainScreenV2BtnText: string,
  mainScreenV2BtnLink: string
}

export class MainScreenV2 extends React.Component<MainScreenV2Props, {}> {
  constructor(props:any) {
    super(props);
  }

  render() {

    const {mainScreenV2Description, mainScreenV2Text, mainScreenV2ConceptText, mainScreenV2BtnText, mainScreenV2BtnLink} = this.props;

    return (
      <div className={styles.mainscr}>
        <div className={styles['mainscr-container']}>
          <TrianglifyCanvas className={styles['mainscr-cover']}/>
          <div className={styles['mainscr-banner']}>
            <div className={styles['mainscr-banner-inner']}>
              <h2>{mainScreenV2Text}</h2>
              <h4>{mainScreenV2ConceptText}</h4>
            </div>
          </div>
          <div className={styles['mainscr-content']}>
            <div className={styles['mainscr-description']}>
              <span>Wal</span><span>cron</span> {mainScreenV2Description}
              <div className={styles['mainscr-divider']}/>
              <Button label={mainScreenV2BtnText} className={'mainscr-know-us'} href={mainScreenV2BtnLink} raised primary/>
            </div>
          </div>
        </div>
      </div>
    );
  };
}

export class TrianglifyCanvas extends React.Component<TrianglifyCanvasProps, TrianglifyCanvasState> {
  private canvas:HTMLElement;

  constructor(props:any) {
    super(props);
    this.state = {
      height: this._getOffsetHeight(),
      width: document.body.offsetWidth,
      resize_timer: 0
    }
  }

  _handleResize = () => {
    this.setState(
      (prevState, props) => {
        return {
          width: window.innerWidth
        };
      }
    );
  }

  _updateImageFilter = () => {
    let pos = this.canvas.getBoundingClientRect().top * -1;

    if(pos > -1 && pos < 201) {
      this.canvas.style.filter = 'grayscale(' + pos + '%)';
    }
    else if (pos < -1){
      this.canvas.style.filter = null;
    }
  };

  componentDidMount() {
    this._renderCanvas();
    window.addEventListener("resize", this._debounceResize.bind(this), false);
    window.addEventListener('scroll', this._updateImageFilter.bind(this), false);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this._debounceResize.bind(this));
    window.removeEventListener('scroll', this._updateImageFilter.bind(this));
  }

  componentDidUpdate() {
    this._renderCanvas();
  }

  _debounceResize = () => {
    const self = this;
    clearTimeout(this.state.resize_timer);

    this.setState(
      (prevState, props) => {
        return {
          resize_timer: setTimeout(self._handleResize.bind(self), 100)
        };
      }
    );
  }

  _getOffsetHeight = () => {
    const expectedSize = Number((window.innerHeight/2).toFixed(0)),
      minSize = 480;
    var height = expectedSize < minSize? minSize: expectedSize;
    return height;
  }

  _renderCanvas = () => {
    const {height, width} = this.state;
    const trianglify = Trianglify({
      x_colors: 'YlGnBu',
      height: this._getOffsetHeight(),
      width: document.body.offsetWidth});
    trianglify.canvas(this.canvas);
  }

  render() {
    const {className} = this.props;
    return (
      <canvas ref={node => this.canvas=node} className={className}/>
    );
  };
}
