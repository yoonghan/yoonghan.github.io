import * as React from 'react';
import { mount } from 'enzyme';
import ManipulatorPage from '../pages/creation/manipulator';

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
  }),
  it('has connect button clickable', async () => {
    const mockResult = {codegen: "1234"};
    const mockFetchPromise = Promise.resolve({json:()=>Promise.resolve(mockResult)})
    jest.spyOn(global, "fetch").mockImplementation(() => mockFetchPromise);
    const wrapper = await mountInitialComponent(<ManipulatorPage/>);
    wrapper.find('#manipulator-connector').invoke("onClickCallback")();
    wrapper.update(); // connect
    wrapper.update(); // hoc connect
    expect(wrapper.find("Manipulator").props().tokenApi.isLoading).toBe(true);
    await waitNextTick();
    wrapper.update();
    expect(wrapper.find("Manipulator").props().tokenApi.success.codegen).toBe(mockResult.codegen);
    wrapper.update();
  }),
  it('has connect button clicked but received token error', async () => {
    const mockResult = "error";
    const mockFetchPromise = Promise.resolve({json:()=>Promise.reject(mockResult)})
    jest.spyOn(global, "fetch").mockImplementation(() => mockFetchPromise);
    const wrapper = await mountInitialComponent(<ManipulatorPage/>);
    wrapper.find('#manipulator-connector').invoke("onClickCallback")();
    wrapper.update(); // connect
    wrapper.update(); // hoc connect
    expect(wrapper.find("Manipulator").props().tokenApi.isLoading).toBe(true);
    await waitNextTick();
    wrapper.update();
    expect(wrapper.find("Manipulator").props().tokenApi.isError).toBe(true);
    wrapper.update();
  }),
  it('has connect button clicked', async () => {
    const mockResult = {codegen: "1234"};
    const mockFetchPromise = Promise.resolve({json:()=>Promise.resolve(mockResult)})
    jest.spyOn(global, "fetch").mockImplementation(() => mockFetchPromise);
    const wrapper = await mountInitialComponent(<ManipulatorPage/>);
    wrapper.find('#manipulator-connector').invoke("onClickCallback")();
    wrapper.update(); // connect
    wrapper.update(); // hoc connect
    expect(wrapper.find("Manipulator").props().tokenApi.isLoading).toBe(true);
    await waitNextTick();
    wrapper.update();
    expect(wrapper.find("Manipulator").props().tokenApi.success.codegen).toBe(mockResult.codegen);
    wrapper.update();
  })
});
