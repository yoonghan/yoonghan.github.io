import * as React from 'react';
import { shallow } from 'enzyme';
import TextMessenger from "../index";


describe('TextMessenger', () => {
  it('renders normally', () => {
    const wrapper = shallow(
      <TextMessenger
        onFocusCallback={()=>{}}
        onBlurCallback={()=>{}}
        onSubmitCallbac={()=>{}}
        maxLength={1}
        filterSuggestion={()=>[]}
      />);
    expect(wrapper.debug()).toMatchSnapshot();
  })
});
