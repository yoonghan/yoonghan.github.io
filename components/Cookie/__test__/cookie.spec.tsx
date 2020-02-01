import * as React from 'react';
import { shallow } from 'enzyme';
import Cookie from "../index";

describe('ButtonsBar', () => {
  it('renders closed normally', () => {
    const wrapper = shallow(
      <Cookie isClosed={true}/>
    );
    expect(wrapper.debug()).toMatchSnapshot();
  }),
  it('renders open normally', () => {
    const wrapper = shallow(
      <Cookie isClosed={false}/>
    );
    expect(wrapper.debug()).toMatchSnapshot();
  })
});
