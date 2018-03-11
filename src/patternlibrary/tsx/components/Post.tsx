`use strict`

import * as React from "react";
import { MiniPost, MiniPostProps } from "./MiniPost";

import '../../scss/base';
var styles = require('../../scss/components/Post');
declare function require(path: string): any;

export interface PostProps {
  postItems: Array<MiniPostProps>;
}

export class Post extends React.Component<PostProps, {}> {
  constructor(props:any) {
    super(props);
  };

  _createPostListing = ():JSX.Element[] => {
    const postListing = this.props.postItems;

    let counter = 0;
    return postListing.map(
      (post) => {
        counter++;
        return (
          <MiniPost key={counter} {...post}/>
        );
    });
  }

  render() {
    return (
      <div className={styles.post}>{this._createPostListing()}</div>
    );
  }
}
