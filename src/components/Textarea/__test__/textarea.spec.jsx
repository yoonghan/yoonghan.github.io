import * as React from 'react';
import { shallow } from 'enzyme';
import TextArea from "../index";


describe('SocialFab', () => {
  it('renders normally', () => {
    const wrapper = shallow(<TextArea row={1} col={1} text="text"/>);
    expect(wrapper.debug()).toMatchSnapshot();
  })
});
