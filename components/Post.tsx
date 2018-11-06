`use strict`

import * as React from "react";
import { MiniPost, MiniPostProps } from "./MiniPost";

export interface PostProps {
  postItems: Array<MiniPostProps>;
}

export class Post extends React.PureComponent<PostProps, {}> {
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
      <div>{this._createPostListing()}</div>
    );
  }
}
