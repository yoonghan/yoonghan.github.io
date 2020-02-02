import * as React from 'react';
import { shallow } from 'enzyme';
import CinemaScreen from "../index";

describe('ButtonsBar', () => {
  it('renders normally', () => {
    const wrapper = shallow(
      <CinemaScreen
        title="Title"
        btnOneStr="btnOneStr"
        btnTwoStr="btnTwoStr"
        btnOneClick="site1"
        btnTwoClick="site2"
        />
    );
    expect(wrapper.debug()).toMatchSnapshot();
  })
});
