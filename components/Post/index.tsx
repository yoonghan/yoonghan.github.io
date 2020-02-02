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

    let counter = 0;
    return postListing.map(
      (post) => {
        counter++;
        return (
          <MiniPost key={counter} {...post}/>
        );
    });
  }

  return (
    <div>{_createPostListing()}</div>
  );
}

export default Post;
