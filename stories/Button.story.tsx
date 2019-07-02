import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { BASIC_MENU } from './menu';
import { Button } from '../components/Button';

export const Component = () => {
  return (
    <div style={{width:"400px", height:"400px"}}>
      <Button>Click Me</Button>
    </div>
  );
}

const stories = storiesOf(`${BASIC_MENU}/Button`, module);
stories.add('Type1', Component);
