import * as React from 'react';
import { BASIC_MENU } from './menu';
import { storiesOf } from '@storybook/react';
import WelcomeScreen from '../components/WelcomeScreen';

const Component = () => {
  return <WelcomeScreen/>
}

const stories = storiesOf(`${BASIC_MENU}/Test`, module);
stories.add('WelcomeScreen', Component);
