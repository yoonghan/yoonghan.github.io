import * as React from 'react';
import { shallow } from 'enzyme';
import LetterBox from "../index";

describe('LetterBox', () => {
  it('renders normally', () => {
    const wrapper = shallow(<LetterBox/>);
    expect(wrapper.debug()).toMatchSnapshot();
  })
});
