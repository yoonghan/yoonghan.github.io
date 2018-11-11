import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { BASIC_MENU } from './menu';
import { Menu } from '../components/Menu';

export const Menu_White = () => {
  return(
    <Menu
     menuItems={[
       <a href="link1">Link 1</a>,
       <a href="link2">Link 2</a>,
       <a href="link3">Link 2</a>
     ]}
     />
  );
}

export const Menu_Black = () => {
  return(
    <Menu
     menuItems={[
       <a href="link1">Link 1</a>,
       <a href="link2">Link 2</a>,
       <a href="link3">Link 2</a>
     ]}
     whiteOnBlack={true}
     />
  );
}

const stories = storiesOf(`${BASIC_MENU}/Menu`, module);
stories.add('White', Menu_White);
stories.add('Black', Menu_Black);
