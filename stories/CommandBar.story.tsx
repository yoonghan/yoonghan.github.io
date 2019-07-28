import * as React from 'react';
import { BASIC_MENU } from './menu';
import { storiesOf } from '@storybook/react';
import CommandBar from '../components/CommandBar';

export const Component = () => {
  return (
    <div style={{width:"400px", height:"400px", background:"#000", padding: "20px", position: "relative"}}>
      <CommandBar/>
    </div>
  );
}

const stories = storiesOf(`${BASIC_MENU}`, module);
stories.add('Command Bar', Component);
