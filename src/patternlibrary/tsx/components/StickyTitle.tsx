`use strict`

import * as React from "react";

import '../../scss/base.scss';
var styles = require('../../scss/components/StickyTitle.scss');
declare function require(path: string): any;

const pushClassName = styles['stickytitle-pushbackward'];
const pullClassName = styles['stickytitle-pullbackward'];

interface StickyTitleState {
  topElement?: HTMLElement;
  stickyTitleElement?: HTMLElement;
  topPosition?: number;
}

export interface StickyTitleProp {
  text: string;
  pos: number;
}

const startTopPosition:number = 50;

export class StickyTitle extends React.Component<StickyTitleProp, StickyTitleState> {
  constructor(props:any) {
    super(props);
    this.state = {
      topElement: undefined,
      stickyTitleElement: undefined,
      topPosition: 0
    };
  }

  _mountScroll = (node:HTMLElement) => {
    if (node) {
      this.setState(
        (prevState, props) => {
          return {
            topElement: node
          };
        }
      );

      window.addEventListener('scroll',
        () => this._moveStickyTitleBackdrop(node.getBoundingClientRect().top),
        false);
    }
  };

  _mountStickyTitle = (node:HTMLElement) => {
    if (node) {
      this.setState(
        (prevState, props) => {
          return {
            stickyTitleElement: node,
            topPosition: (props.pos * startTopPosition + 10)
          };
        }
      );
    }
  };

  _moveStickyTitleBackdrop = (pos: number) => {
    const {stickyTitleElement, topPosition} = this.state;

    if (stickyTitleElement !== undefined) {
      const classList = stickyTitleElement.classList;

      if(pos < topPosition) {
        if (!classList.contains(pullClassName)) {
          classList.add(pullClassName);
          classList.remove(pushClassName);
          stickyTitleElement.style.top = String(topPosition) + 'px';
        }
      }
      else if(classList.contains(pullClassName)) {
        classList.remove(pullClassName);
        classList.add(pushClassName);
        stickyTitleElement.style.top = '0';
      }
    }
  };

  _handleTitleClick = () => {
    const scrollDuration = 500;
    const {topElement, topPosition} = this.state;

    if(topElement !== undefined) {
      const pos = (topElement.getBoundingClientRect().top * -1) + topPosition;
      if(pos > 0) {
        var scrollHeight = pos;
        const scrollStep = Math.PI / ( scrollDuration / 15 ),
            cosParameter = scrollHeight / 2;
        var scrollCount = 0,
            scrollMargin,
            scrollInterval = setInterval( function() {
              if ( scrollHeight > 0 ) {
                  scrollCount = scrollCount + 1;
                  scrollMargin = cosParameter - cosParameter * Math.cos( scrollCount * scrollStep );
                  window.scrollTo( 0, ( window.scrollY - scrollMargin ) );
                  scrollHeight -= scrollMargin;
              }
              else clearInterval(scrollInterval);
            }, 15 );
      }
    }
  }

  render() {
    const {text} = this.props;
    const acroynm = text.charAt(0),
          full_acroynm = text.substring(1);
    return (
      <div ref={this._mountScroll} onClick={this._handleTitleClick}>
        <div className={styles.stickytitle}>
          <div className={styles['stickytitle-static']}>
            <h3>{acroynm}{full_acroynm}</h3>
          </div>
          <div className={styles['stickytitle-anim']} ref={this._mountStickyTitle}>
            <h3>{acroynm}<span className={styles['stickytitle-hide']}>{full_acroynm}</span></h3>
          </div>
        </div>
      </div>
    );
  }
}
