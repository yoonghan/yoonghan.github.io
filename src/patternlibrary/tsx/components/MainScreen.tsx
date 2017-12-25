`use strict`

import * as React from "react";
import * as Trianglify from "trianglify";

import '../../scss/base';
var styles = require('../../scss/components/MainScreen');
declare function require(path: string): any;

interface SliderDisplayItem {
  text:string;
  link?: string;
}

interface TrianglifyCanvasState {
  height?: number;
  width?: number;
  resize_timer?: any;
}

interface TrianglifyCanvasProps {
  className: string;
}

export interface SliderDisplayItemProps {
  itemArray: Array<SliderDisplayItem>;
}

export class MainScreen extends React.Component<SliderDisplayItemProps, {}> {
  constructor(props:any) {
    super(props);
  }

  renderItems = () => {
    const technologies = this.props.itemArray;
    return technologies.map(function(item) {
      const {text, link} = item;
      let techlink = (typeof link === 'undefined' ? '#': link);

      return (<div className={styles['mainscr-slider-item']} key={text}>
        <h3>
          <a href={techlink} target="_blank" className='links'>
            {text} - <i className='fa fa-link'></i>
          </a>
        </h3>
        </div>);
    });
  };

  render() {
    let settings = {
      dots: true,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
      <div className={styles.mainscr}>
        <div className={styles['mainscr-container']}>
          <img className={styles['mainscr-company']} src="/ext/img/logo/companyName.svg"/>
          <TrianglifyCanvas className={styles['mainscr-cover']}/>
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
    var height = Number((window.innerHeight/3).toFixed(0));
    height = height < 200? 200: height;
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
