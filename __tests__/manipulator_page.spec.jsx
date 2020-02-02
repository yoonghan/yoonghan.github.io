import * as React from 'react';
import { mount } from 'enzyme';
import ManipulatorPage from '../pages/manipulator';

//Increase wait time
jest.setTimeout(5000);

//Rewrite dynamic.
jest.mock('next/dynamic');

//Rewrite pusher
jest.mock("pusher-js");

const waitNextTick = async () => {
  return new Promise(resolve => setTimeout(resolve, 2000));
}

const mountInitialComponent = async (component) => {
  const wrapper = mount(component);
  await waitNextTick();
  wrapper.update();
  return wrapper;
};

describe('Manipulator Page', () => {
  it('should render correctly', async () => {
    /** Will throw exception, i.e. wrapped not called. **/
    const wrapper = await mountInitialComponent(<ManipulatorPage/>);
    expect(wrapper.find('NoSSRChatMessageBox').exists()).toBe(true);
    expect(wrapper.find('#manipulator-connector').exists()).toBe(true);
  })
});
