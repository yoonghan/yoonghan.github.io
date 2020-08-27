`use strict`

/**
 * Upgraded to use React.Fragment to return multiple elements.
 **/
import * as React from "react";

import {TimelineContainer, TimelineDisplayProp, TimelineContainerProp, YearOnlyDisplay} from './TimelineContainer';

import '../../../scss/base.scss';
var styles = require('../../../scss/components/Timeline.scss');
declare function require(path: string): any;

//Typescript syntax.
function isTimelineContainer(timelineContainerProp: any): timelineContainerProp is TimelineContainerProp {
  return timelineContainerProp.title;
}

export interface TimelineProp {
  postArray?: Array<TimelineDisplayProp>;
}

export class Timeline extends React.PureComponent<TimelineProp, {}> {
  constructor(props:any) {
    super(props);
  }

  _createTimelineObject = (post: TimelineContainerProp) => {
    return(
      <React.Fragment>
        <div key={0} className={styles['box-container']}>
          <div className={styles['box']}>
            <TimelineContainer {...post}/>
          </div>
        </div>
        <div key={1} className={styles['icon']}></div>
      </React.Fragment>
    );
  }

  _createYearTimelineObject = (post: YearOnlyDisplay) => {
    return (
      <React.Fragment>
        <div key={0} className={styles['year-wrapper']}></div>
        <div key={1} className={styles['year']}><h3>{post.year}</h3></div>
      </React.Fragment>
    );
  }

  _isEven = (counter: number):Boolean => {
    return (counter % 2 == 0);
  }

  _createTimelinePost = ():JSX.Element[] => {
    const postListing = this.props.postArray;
    const self = this;

    let counter = 0;
    let timelineCounter = 1;

    return postListing.map(
      (post: TimelineDisplayProp) => {
        counter++;
        const aTimelineContainer = isTimelineContainer(post);
        timelineCounter = aTimelineContainer ? (1 + timelineCounter) : timelineCounter;
        //ommit using css to control even, best way may be .primary + .primary
        return (
          <li key={counter} className={(self._isEven(timelineCounter)? styles['even'] : '')}>
            {aTimelineContainer && self._createTimelineObject(post as TimelineContainerProp)}
            {!aTimelineContainer && self._createYearTimelineObject(post as YearOnlyDisplay)}
          </li>
        );
    });
  }

  render() {
    const postListing = this._createTimelinePost();

    return (
      <div className={styles.timeline}>
        <ul>
          {postListing}
        </ul>
      </div>
    );
  }
}
