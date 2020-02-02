import * as React from 'react';
import { mount } from 'enzyme';
import Loader from "../index";

describe('Loader', () => {
  it('renders normally', () => {
    const wrapper = mount(<Loader/>);
    expect(wrapper.debug()).toMatchSnapshot();
  })
});
