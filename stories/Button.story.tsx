import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { BASIC_MENU } from './menu';
import SocialFab from '../components/SocialFab';
import Button from '../components/Button';
import ButtonsBar from '../components/ButtonsBar';

export const Component = () => {
  return (
    <div className="container">
      <Button>Click Me</Button>
      <style jsx>{`
        .container {
          width: 400px,
          height: 400px,
          background: #000,
          padding: 20px
        }
        `}</style>
    </div>
  );
}

export const Component2 = () => {
  return (
    <div className="container">
      <ButtonsBar menuTexts={[
        {title:"abc",link:"/"},
        {title:"def",link:"/"},
        {title:"123",link:"/"}
        ]}/>
        <style jsx>{`
          .container {
            width: 400px,
            height: 400px,
            background: #000,
            padding: 20px
          }
          `}</style>
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
