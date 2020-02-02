import * as React from 'react';
import { shallow } from 'enzyme';
import NoSSRChatMessageBox from "../index";

describe('NoSSRChatMessageBox', () => {
  it('renders normally', () => {
    const wrapper = shallow(
      <NoSSRChatMessageBox/>
    );
    expect(wrapper.debug()).toMatchSnapshot();
  })
});
