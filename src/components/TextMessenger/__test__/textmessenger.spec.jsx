import * as React from 'react';
import { shallow, mount } from 'enzyme';
import TextMessenger from "../index";


describe('TextMessenger', () => {
  it('should render normally', () => {
    const wrapper = shallow(
      <TextMessenger
        onFocusCallback={()=>{}}
        onBlurCallback={()=>{}}
        onSubmitCallbac={()=>{}}
        maxLength={1}
        filterSuggestion={()=>[]}
      />);
    expect(wrapper.debug()).toMatchSnapshot();
  }),
  it('should run command click correctly', () => {
    const wrapper = mount(
      <TextMessenger
        onFocusCallback={()=>{}}
        onBlurCallback={()=>{}}
        onSubmitCallbac={()=>{}}
        maxLength={1}
        filterSuggestion={()=>[]}
      />);
    wrapper.find("#textmessenger-form").prop("onSubmit")({preventDefault: ()=>{}});
  }),
  it('should run change suggestion correctly', () => {
    const wrapper = mount(
      <TextMessenger
        onFocusCallback={()=>{}}
        onBlurCallback={()=>{}}
        onSubmitCallbac={()=>{}}
        maxLength={1}
        filterSuggestion={()=>[]}
      />);
  })
});
