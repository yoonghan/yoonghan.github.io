import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { BASIC_MENU } from './menu';
import ButtonsBar from '../components/ButtonsBar';

export const Component = () => {
  return (
    <div style={{width:"400px", height:"400px", background:"#000", padding: "20px"}}>
      <ButtonsBar menuTexts={["abc", "123", "d4e","555"]}/>
    </div>
  );
}

const stories = storiesOf(`${BASIC_MENU}/Button`, module);
stories.add('Type2', Component);
