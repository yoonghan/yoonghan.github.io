import * as React from 'react';
import { BASIC_MENU } from './menu';
import { storiesOf } from '@storybook/react';
import NavMenu from '../components/CommandBar/NavMenu';

export const Component = () => {
  return (
    <div style={{width:"400px", height:"400px", background:"rgba(0,0,0,0.5)", padding: "20px", position: "relative"}}>
      <NavMenu/>
    </div>
  );
}

const stories = storiesOf(`${BASIC_MENU}`, module);
stories.add('Navi Menu', Component);
