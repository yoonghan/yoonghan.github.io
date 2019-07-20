import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { BASIC_MENU } from './menu';
import HeaderOne from '../components/HeaderOne';

export const Component = () => {
  return (
    <div style={{background: "#666666"}}>
      <HeaderOne title="Sample HeaderOne Text"/>
      <HeaderOne title="Sample HeaderOne Text" isBlackOnWhite={true}/>
    </div>
  );
}

const stories = storiesOf(`${BASIC_MENU}/Fonts`, module);
stories.add('H1', Component);
