`use strict`

import * as React from "react";
import * as Trianglify from "trianglify";
import {HeaderV2} from "./HeaderV2";
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

const linkArray = [
  {
    title: "About",
    icon: "question",
    path: "about"
  },
  {
    title: "Blog",
    icon: "file-text-o",
    path: "blog"
  }
];

export class MainScreenV2 extends React.Component<{}, {}> {
  constructor(props:any) {
    super(props);
  }

  render() {
    return (
      <div className={styles.mainscr}>
        <HeaderV2 linkArray={linkArray}/>
        <div className={styles['mainscr-container']}>
          <TrianglifyCanvas className={styles['mainscr-cover']}/>
          <div className={styles['mainscr-banner']}>
            <div className={styles['mainscr-banner-inner']}>
              <h2>A Simple Start Up Site</h2>
              <h4>"Inspired by the Ikigai Concept"</h4>
            </div>
          </div>
          <div className={styles['mainscr-content']}>
            <div className={styles['mainscr-description']}>
              <span>Wal</span><span>cron</span> is a dedicated website created by Han &amp; Lee Wan to represent their life as a programmer.
              <div className={styles['mainscr-divider']}/>
              <Button label={"Get to know us !"} className={'mainscr-know-us'} raised primary/>
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
      height: this.getOffsetHeight(),
      width: document.body.offsetWidth,
      resize_timer: 0
    }
  }

  handleResize = () => {
    this.setState(
      (prevState, props) => {
        return {
          width: window.innerWidth
        };
      }
    );
  }

  updateImageFilter = () => {
    let pos = this.canvas.getBoundingClientRect().top * -1;

    if(pos > -1 && pos < 201) {
      this.canvas.style.filter = 'grayscale(' + pos + '%)';
    }
    else if (pos < -1){
      this.canvas.style.filter = null;
    }
  };

  componentDidMount() {
    this.renderCanvas();
    window.addEventListener("resize", this.debounceResize.bind(this), false);
    window.addEventListener('scroll', this.updateImageFilter.bind(this), false);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.debounceResize.bind(this));
    window.removeEventListener('scroll', this.updateImageFilter.bind(this));
  }

  componentDidUpdate() {
    this.renderCanvas();
  }

  debounceResize = () => {
    const self = this;
    clearTimeout(this.state.resize_timer);

    this.setState(
      (prevState, props) => {
        return {
          resize_timer: setTimeout(self.handleResize.bind(self), 100)
        };
      }
    );
  }

  getOffsetHeight = () => {
    const expectedSize = Number((window.innerHeight/2).toFixed(0)),
      minSize = 480;
    var height = expectedSize < minSize? minSize: expectedSize;
    return height;
  }

  renderCanvas = () => {
    const {height, width} = this.state;
    const trianglify = Trianglify({
      x_colors: 'YlGnBu',
      height: this.getOffsetHeight(),
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
