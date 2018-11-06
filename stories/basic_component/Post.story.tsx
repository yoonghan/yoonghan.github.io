import * as React from 'react';
import { Post } from '../../components/Post';

const posts = [
  {title: 'Post 1', text: 'Post 1 Text', icon: 'adn'},
  {title: 'Post 2', text: 'Post 2 Text', icon: 'adn'},
  {title: 'Post 3', text: 'Post 3 Text', icon: 'adn'},
];

const Component = () => {
  return <Post postItems={posts}/>
}

export default Component;
