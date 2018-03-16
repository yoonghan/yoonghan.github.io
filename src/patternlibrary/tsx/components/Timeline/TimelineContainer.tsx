`use strict`

import * as React from "react";
import { ImageOverlay } from '../ImageOverlay';

import '../../../scss/base.scss';
var styles = require('../../../scss/components/Timeline.scss');
declare function require(path: string): any;

export type TimelineDisplayProp = YearOnlyDisplay | TimelineContainerProp;

export interface TimelineContainerProp {
  title: string;
  image?: string;
  altImage?: string;
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

export class TimelineContainer extends React.PureComponent<TimelineContainerProp,{}> {
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

  _clickImage = () => {
    const {altImage} = this.props;
    if(altImage){
      const imageOverlayRef = this.refs.overlayRef as ImageOverlay;
      imageOverlayRef.show();
    }
  };

  render() {
    const {title, image, altImage, description, linkArray} = this.props;
    const linkListing = (linkArray && this._createLinks()) || <div className={styles['empty-content']}></div>;

    return (
      <div className={styles['content-container']}>
        {altImage && <ImageOverlay imageSrc={altImage} ref="overlayRef"/>}
        <h4>{title}</h4>
        <div className={styles['divider']}/>
        <div>
          {image && <img src={image} onClick={this._clickImage} className={altImage && styles["clickable"]}/>}
          <div className={styles['content-desc-container']}>{description}</div>
          {linkListing}
        </div>
      </div>
    )
  }
}
