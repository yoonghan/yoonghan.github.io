import * as React from 'react';
import { mount } from 'enzyme';
import Menu from "../index";

const menuItems = [
  <React.Fragment/>,
  <div></div>,
  <div>Non Empty</div>
]

describe('Menu', () => {
  it('renders whiteOnBlack normally', () => {
    const wrapper = mount(<Menu whiteOnBlack={true} menuItems={menuItems}/>);
    expect(wrapper.debug()).toMatchSnapshot();
  }),
  it('renders blackOnWhite normally', () => {
    const wrapper = mount(<Menu whiteOnBlack={false} menuItems={menuItems}/>);
    expect(wrapper.debug()).toMatchSnapshot();
  })
});
