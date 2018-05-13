`use strict`

/**
* Rotating image background for Overlay Indicator is saved as based 64 in scss
* Update to remove props drilling, by replacing Context
**/
import * as React from "react";
import {Transition} from 'react-transition-group';

import {Moziac} from './Moziac';
import {Item, LEAVE_TIME} from './Const';
import {Overlay} from './Overlay';

import '../../../scss/base.scss';

var styles = require('../../../scss/components/Gallery.scss');
declare function require(path: string): any;

interface GalleryState {
  isOverlayOpen: boolean;
  clickPosLeft: number;
  clickPosTop: number;
  selectedIdx: number;
}

export interface GalleryProps {
  items: Array<Item>;
}

export class Gallery extends React.PureComponent<GalleryProps, GalleryState> {

  private transitionStyles:any = {
    entering: {opacity:0},
    entered: {opacity:1},
    exiting: {opacity: 0, transition: 'opacity ' + LEAVE_TIME + 'ms ease-in'}
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
        <Transition in={this.state.isOverlayOpen} timeout={LEAVE_TIME} appear={this.state.isOverlayOpen}>
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
