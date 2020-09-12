`use strict`

import * as React from "react";
import MiniPost from "../MiniPost";
import { MiniPostProps } from "../MiniPost";

export interface PostProps {
  postItems: Array<MiniPostProps>;
}

const Post:React.FC<PostProps> = ({postItems}) => {
  const _createPostListing = ():JSX.Element[] => {
    const postListing = postItems;

    return postListing.map(
      (post, idx) => {
        return (
          <MiniPost key={`minipost_${idx}`} {...post}/>
        );
    });
  }

  return (
    <div>{_createPostListing()}</div>
  );
}

export default Post;
