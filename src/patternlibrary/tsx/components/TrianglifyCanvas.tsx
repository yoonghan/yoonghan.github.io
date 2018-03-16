`use strict`

import * as React from "react";
import * as Trianglify from "trianglify";

interface TrianglifyCanvasState {
  height?: number;
  width?: number;
  resize_timer?: any;
}

interface TrianglifyCanvasProps {
  className: string;
}

export class TrianglifyCanvas extends React.PureComponent<TrianglifyCanvasProps, TrianglifyCanvasState> {
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
