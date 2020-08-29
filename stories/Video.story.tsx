import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { BASIC_MENU } from './menu';
import Video from '../components/Video';



const Component = () => {
  return <Video
    src="/mov/welcome.mp4"
    imgSrc="/img/welcome/girl-in-glass"
  />
}

const stories = storiesOf(`${BASIC_MENU}`, module);
stories.add('Video', Component);
