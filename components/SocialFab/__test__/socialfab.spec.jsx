import * as React from 'react';
import { mount } from 'enzyme';
import SocialFab from "../index";

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

describe('SocialFab', () => {
  it('renders lazy normally', async () => {
    const wrapper = await mountInitialComponent(<SocialFab/>);
    expect(wrapper.debug()).toMatchSnapshot();
  })
});
