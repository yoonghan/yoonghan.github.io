import * as React from 'react';
import { shallow, mount } from 'enzyme';
import CommandBar from "../index";

//Increase wait time
jest.setTimeout(5000);

//Rewrite router.
jest.mock("next/router");

//Rewrite dynamic.
jest.mock('next/dynamic');

const waitNextTick = async () => {
  return new Promise(resolve => setTimeout(resolve, 2000));
}

const mountInitialComponent = async (component) => {
  const wrapper = mount(component);
  await waitNextTick();
  wrapper.update();
  return wrapper;
};

describe('CommandBar', () => {
  it('renders lazy normally', () => {
    const wrapper = shallow(<CommandBar/>);
    expect(wrapper.debug()).toMatchSnapshot();
  }),
  it('renders lazy normally', async () => {
    const wrapper = await mountInitialComponent(<CommandBar/>);
    expect(wrapper.debug()).toMatchSnapshot();
  })
});
