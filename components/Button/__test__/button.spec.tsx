import * as React from 'react';
import { shallow } from 'enzyme';
import Button from "../index";

describe('Button', () => {
  it('renders normally', () => {
    const wrapper = shallow(<Button><div>Children</div></Button>);
    expect(wrapper.debug()).toMatchSnapshot();
  }),
  it('renders with small icon', () => {
    const wrapper = shallow(<Button href="sample" target="sample" small={true}/>);
    expect(wrapper.debug()).toMatchSnapshot();
  }),
  it('renders with inverted color', () => {
    const wrapper = shallow(<Button invert={true}/>);
    expect(wrapper.debug()).toMatchSnapshot();
  }),
  it('renders with click', () => {
    const wrapper = shallow(<Button onClickCallback={()=>{}}/>);
    expect(wrapper.debug()).toMatchSnapshot();
  })
});
