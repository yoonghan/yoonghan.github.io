import * as React from "react";
import { MiniPost, MiniPostProps } from "./MiniPost";

import '../../css/base';
var styles = require('../../css/components/Post');
declare function require(path: string): any;

export interface PostProps {
  postItems: Array<MiniPostProps>;
}

export class Post extends React.Component<PostProps, {}> {
  constructor(props:any) {
    super(props);
  };

  createPostListing = ():JSX.Element[] => {
    const postListing = this.props.postItems;

    return postListing.map(function(post) {
      return (
        <MiniPost key={post.icon} {...post}/>
      );
    });
  }

  render() {
    return (
      <div className={styles.post}>{this.createPostListing()}</div>
    );
  }
}
