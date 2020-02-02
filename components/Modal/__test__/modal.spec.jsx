import * as React from 'react';
import { shallow } from 'enzyme';
import Modal from "../index";

describe('Modal', () => {
  it('renders normally', () => {
    const wrapper = shallow(
      <Modal
        ignoreSelfClose={true}
        cancelCallback={()=>{}}
      />
    );
    expect(wrapper.debug()).toMatchSnapshot();
  }),
  it('renders non-ignored normally', () => {
    const wrapper = shallow(
      <Modal
        ignoreSelfClose={false}
        cancelCallback={()=>{}}
      />
    );
    expect(wrapper.debug()).toMatchSnapshot();
  })
});
