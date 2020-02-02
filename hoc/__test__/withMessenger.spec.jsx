import * as React from 'react';
import { mount } from 'enzyme';
import withMessenger from "../withMessenger";

const SampleComponent = () => {
  return (
    <div>Sample</div>
  )
}

describe('Creation v2', () => {
  let WithMessengerComponent;
  beforeEach(() => {
    const mapTokenApi = (result) => ({messengerApi: result});
    WithMessengerComponent = withMessenger(mapTokenApi)(SampleComponent);
  });
  it('renders normally', () => {
    const wrapper = mount(<WithMessengerComponent/>);
    const sampleProperties = wrapper.find(SampleComponent).props();
    expect(sampleProperties.messengerApi.isConnected()).toBe(false);
    expect(sampleProperties.messengerApi.connect).toBeDefined();
    expect(sampleProperties.messengerApi.disconnect).toBeDefined();
  })
});
