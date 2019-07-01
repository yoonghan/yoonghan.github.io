import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { BASIC_MENU } from './menu';
import { CinemaScreen } from '../components/CinemaScreen';

export const Mainscreen = () => {
  return (
    <div style={{width:"400px", height:"400px"}}>
      HELLO
      <CinemaScreen/>
    </div>
  );
}

const stories = storiesOf(`${BASIC_MENU}`, module);
stories.add('Main Screen', Mainscreen);
