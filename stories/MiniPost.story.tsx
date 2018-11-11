import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { BASIC_MENU } from './menu';
import { MiniPost } from '../components/MiniPost';

const Component = () => {
  return <MiniPost title={"Sample Title"} text={'Content'} icon={'icon'}/>
}

const stories = storiesOf(`${BASIC_MENU}`, module);
stories.add('Mini Post', Component);
