`use strict`

import * as React from "react";

import '../../scss/base';
var styles = require('../../scss/components/Timeline');
declare function require(path: string): any;

type TimelineDisplayProp = YearOnlyDisplay | TimelineContainerProp;

export interface TimelineProp {
  postArray?: Array<TimelineDisplayProp>;
}

export interface TimelineContainerProp {
  title: string;
  image?: string;
  description: string;
  linkArray?: Array<Link>;
}

export interface YearOnlyDisplay {
  year: number;
}

export interface Link{
  text: string;
  path: string;
}


//Typescript syntax.
function isTimelineContainer(timelineContainerProp: any): timelineContainerProp is TimelineContainerProp {
  return timelineContainerProp.title;
}

export class Timeline extends React.Component<TimelineProp, {}> {
  constructor(props:any) {
    super(props);
  }

  _createTimelineObject = (post: TimelineContainerProp) => {
    return [
      (<div key={0} className={styles['box-container']}>
        <div className={styles['box']}>
          <TimelineContainer {...post}/>
        </div>
      </div>),
      (<div key={1} className={styles['icon']}></div>)
    ];
  }

  _createYearTimelineObject = (post: YearOnlyDisplay) => {
    return [
      (<div key={0} className={styles['year-wrapper']}></div>),
      (<div key={1} className={styles['year']}><h5>{post.year}</h5></div>)
    ];
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

class TimelineContainer extends React.Component<TimelineContainerProp,{}> {
  constructor(props:any) {
    super(props);
  }

  _createLinks = ():JSX.Element[] => {
    const linkListing = this.props.linkArray;

    let counter = 0;
    return linkListing.map(
      (link) => {
        counter++;
        //const location = link.path.indexOf('http') === 0 ? "_blank": "_self";

        return (
          <a href={link.path} target="_blank" key={counter}>&gt; {link.text}</a>
        );
    });
  }

  render() {
    const {title, image, description, linkArray} = this.props;
    const linkListing = (linkArray && this._createLinks()) || <div className={styles['empty-content']}></div>;

    return (
      <div className={styles['content-container']}>
        <h4>{title}</h4>
        <div className={styles['divider']}/>
        <div>
          {image && <img src={image}/>}
          <div className={styles['content-desc-container']}>{description}</div>
          {linkListing}
        </div>
      </div>
    )
  }
}
