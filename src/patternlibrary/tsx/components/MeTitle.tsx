`use strict`

import * as React from "react";
import { MiniPost, MiniPostProps } from './MiniPost';

import '../../scss/base.scss';
var styles = require('../../scss/components/MeTitle.scss');
declare function require(path: string): any;

interface ISection {
  title?: string;
  description?: Array<string>;
}

export interface MeTitleProps {
  title: string;
  imgSrc: string;
  introSection?: ISection;
  posts?: Array<MiniPostProps>;
}

export class MeTitle extends React.Component<MeTitleProps, {}> {
  createPost = (postMap:MiniPostProps) => {
    const {title} = postMap;
    return (
      <div key={title}>
        <MiniPost {...postMap}/>
      </div>
    );
  };

  createIntroSection = (sectionMap:ISection) => {
    const title = sectionMap.title;
    const keyPrefix = title? title.replace(/\s/g,''): '';

    var runningNo = 0;
    const intro = sectionMap.description.map(
      descItem => {
        const keyVal = keyPrefix + String(runningNo++);
        return <p key={keyVal}>{descItem}</p>
      }
    );

    return (
      <div key={title}>
        {title && <h2>{title}</h2>}
        {intro}
      </div>
      );
  };

  render() {
    const {title, imgSrc, introSection, posts} = this.props;
    const introductionSection = introSection ? this.createIntroSection(introSection) : <div></div>;

    let postsArray = posts ? posts:[];
    const postElements = postsArray.map(
      postItem => this.createPost(postItem)
    );


    return (
      <div className={styles.metitle}>
        <div>
          <h1>{title}</h1>
          <img src={imgSrc}/>
        </div>
        <div>
          {introductionSection}
          {postElements}
        </div>
      </div>
    )
  }
}
