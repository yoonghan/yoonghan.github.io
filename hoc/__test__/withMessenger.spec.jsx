import * as React from 'react';
import { mount } from 'enzyme';
import withMessenger, {EnumConnection} from "../withMessenger";
import { PUSHER } from "../../shared/const";

jest.mock("pusher-js");

const SampleComponent = () => {
  return (
    <div>Sample</div>
  )
}

describe('HOC WithMessenger', () => {
  describe("by rendering HOC", () => {
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
  }),
  describe("with bad connection", () => {
    let WithMessengerComponent;
    let errorEventCall = "";
    let wrapper = null;
    const parentComponentName = "Messenger";
    const channelName = "sampleChannelName";

    beforeEach(() => {
      jest.resetModules();
      const mapTokenApi = (result) => ({messengerApi: result});
      WithMessengerComponent = withMessenger(mapTokenApi)(SampleComponent);
      const mockPrintConnectionCallback = (data) => {errorEventCall=data};
      const mockPrintEventCallback = (data) => {};
      wrapper = mount(<WithMessengerComponent/>);
      wrapper.find(SampleComponent).props().messengerApi.connect(channelName, mockPrintConnectionCallback, mockPrintEventCallback);
      wrapper.update();
    });
    it('renders with error', () => {
      //First state
      const updatedState = wrapper.find(parentComponentName).state();
      expect(updatedState.channelName).toBe(PUSHER.channel_prefix+channelName);
      expect(updatedState.connectionStatus).toBe(0);
      expect(errorEventCall).toBe("Configuration error. Please inform administrator.");
    })
  }),
  describe("with connection", () => {
    let WithMessengerComponent;
    let errorEventCall = "";
    let wrapper = null;
    const parentComponentName = "Messenger";
    const channelName = "sampleChannelName";

    beforeEach(() => {
      jest.resetModules();
      process.env.PUSHER_APP_KEY="SAMPLE_KEY"
      const mapTokenApi = (result) => ({messengerApi: result});
      WithMessengerComponent = withMessenger(mapTokenApi)(SampleComponent);
      const mockPrintConnectionCallback = (data) => {errorEventCall=data};
      const mockPrintEventCallback = (data) => {};
      wrapper = mount(<WithMessengerComponent/>);
      wrapper.find(SampleComponent).props().messengerApi.connect(channelName, mockPrintConnectionCallback, mockPrintEventCallback);
      wrapper.update();
    });
    it('renders with connectivity error', () => {
      //First state
      const updatedState = wrapper.find(parentComponentName).state();
      expect(updatedState.channelName).toBe(PUSHER.channel_prefix+channelName);
      expect(updatedState.connectionStatus).toBe(0);
      expect(errorEventCall).toBe("Configuration error. Please inform administrator.");
    })
  })
});
