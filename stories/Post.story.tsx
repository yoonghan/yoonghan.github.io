import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { BASIC_MENU } from './menu';
import { Post } from '../components/Post';

const posts = [
  {title: 'Post 1', text: 'Post 1 Text', icon: 'adn'},
  {title: 'Post 2', text: 'Post 2 Text', icon: 'adn'},
  {title: 'Post 3', text: 'Post 3 Text', icon: 'adn'},
];

const Component = () => {
  return <Post postItems={posts}/>
}

const stories = storiesOf(`${BASIC_MENU}`, module);
stories.add('Post', Component);
