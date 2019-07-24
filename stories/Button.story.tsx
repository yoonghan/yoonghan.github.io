import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { BASIC_MENU } from './menu';
import SocialFab from '../components/SocialFab';
import Button from '../components/Button';
import ButtonsBar from '../components/ButtonsBar';

export const Component = () => {
  return (
    <div style={{width:"400px", height:"400px", background:"#000", padding: "20px"}}>
      <Button>Click Me</Button>
    </div>
  );
}

export const Component2 = () => {
  return (
    <div style={{width:"400px", height:"400px", background:"#000", padding: "20px"}}>
      <ButtonsBar menuTexts={["abc", "123", "d4e","555"]}/>
    </div>
  );
}

export const Component3 = () => {
  return (
    <div>
      <SocialFab/>
    </div>
  );
}

const stories = storiesOf(`${BASIC_MENU}/Button`, module);
stories.add('Button', Component);
stories.add('Barred Button', Component2);
stories.add('Floating Action Button', Component3);
