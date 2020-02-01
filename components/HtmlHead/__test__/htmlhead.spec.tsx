import * as React from 'react';
import { shallow } from 'enzyme';
import { HtmlHead } from "../index";

describe('Header', () => {
  it('renders normally', () => {
    const wrapper = shallow(<HtmlHead title={"title"} description={"description"}/>);
    expect(wrapper.debug()).toMatchSnapshot();
  }),
  it('renders with nofontawesome normally', () => {
    const wrapper = shallow(
      <HtmlHead
      title={"title"}
      description={"description"}
      nofontawesome={true}/>
    );
    expect(wrapper.debug()).toMatchSnapshot();
  })
});
