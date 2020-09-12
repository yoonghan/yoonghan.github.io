import * as React from 'react';
import { mount } from 'enzyme';
import withConnectivity, {generateRestPath, serialize} from "../withConnectivity";

const SampleComponent = () => {
  const sampleRef = React.createRef(null);
  return (
    <div ref={sampleRef}>Sample</div>
  )
}
const initialValue = "A";

const waitNextTick = async () => {
  return new Promise(resolve => setTimeout(resolve, 1000));
}

describe('HOC WithConnectivity', () => {
  let WithConnectivityComponent;
  beforeEach(() => {
    const mapTokenApi = (result) => ({tokenApi: result});
    WithConnectivityComponent = withConnectivity(mapTokenApi, initialValue)("/api")(SampleComponent);
  });
  it('renders normally', () => {
    const wrapper = mount(<WithConnectivityComponent/>);
    const sampleProperties = wrapper.find(SampleComponent).props();
    expect(sampleProperties.tokenApi.success).toEqual(initialValue);
    expect(sampleProperties.tokenApi.connect).toBeDefined();
    expect(sampleProperties.tokenApi.isLoading).toBe(false);
    expect(sampleProperties.tokenApi.isError).toBe(false);
    expect(sampleProperties.tokenApi.error).toBe("");
  }),
  it('renders success connectivity', async () => {
    const mockResult = {success: "ok"};
    const mockFetchPromise = Promise.resolve({json:()=>Promise.resolve(mockResult)})
    jest.spyOn(global, "fetch").mockImplementation(() => mockFetchPromise);
    const wrapper = mount(<WithConnectivityComponent/>);
    const sampleProperties = wrapper.find(SampleComponent).props();
    sampleProperties.tokenApi.connect({}, "error");
    wrapper.update();
    expect(wrapper.find(SampleComponent).props().tokenApi.isLoading).toBe(true);
    await waitNextTick();
    wrapper.update();
    expect(wrapper.find(SampleComponent).props().tokenApi.isError).toBe(false);
    expect(wrapper.find(SampleComponent).props().tokenApi.isLoading).toBe(false);
    wrapper.update();
    expect(wrapper.find(SampleComponent).props().tokenApi.success).toBe(mockResult);
    global.fetch.mockClear();
  }),
  it('renders fail connectivity', async () => {
    const mockErrorMessage = "Error Message";
    const mockFetchPromise = Promise.resolve({json:()=>Promise.reject({message: mockErrorMessage})})
    jest.spyOn(global, "fetch").mockImplementation(() => mockFetchPromise);
    const wrapper = mount(<WithConnectivityComponent/>);
    const sampleProperties = wrapper.find(SampleComponent).props();
    sampleProperties.tokenApi.connect({}, mockErrorMessage);
    wrapper.update();
    expect(wrapper.find(SampleComponent).props().tokenApi.isLoading).toBe(true);
    await waitNextTick();
    wrapper.update();
    expect(wrapper.find(SampleComponent).props().tokenApi.isLoading).toBe(false);
    expect(wrapper.find(SampleComponent).props().tokenApi.isError).toBe(true);
    expect(wrapper.find(SampleComponent).props().tokenApi.error).toBe(mockErrorMessage);
    global.fetch.mockClear();
  }),
  it('renders GET connectivity', async () => {
    const mockResult = {success: "ok"};
    const mockFetchPromise = Promise.resolve({json:()=>Promise.resolve(mockResult)})
    jest.spyOn(global, "fetch").mockImplementation(() => mockFetchPromise);
    const wrapper = mount(<WithConnectivityComponent/>);
    const sampleProperties = wrapper.find(SampleComponent).props();
    sampleProperties.tokenApi.connect({queryParam1: 1}, "error", "GET");
    wrapper.update();
    expect(wrapper.find(SampleComponent).props().tokenApi.isLoading).toBe(true);
    global.fetch.mockClear();
  }),
  it('translate param correctly', () => {
    const replacementsKey = {
      REPLACE: "SAMPLE",
      URL: "SAMPLEURL"
    };
    const newPath = generateRestPath("/sample/{URL}/{REPLACE}/here",replacementsKey);
    expect(newPath).toBe(`/sample/${replacementsKey.URL}/${replacementsKey.REPLACE}/here`);
  }),
  it('serialize param correctly', () => {
    const queryParams = {
      queryParam1: "param1",
      queryParam2: "param2"
    };
    const serializedParam = serialize(queryParams);
    expect(serializedParam).toBe(`?queryParam1=${queryParams.queryParam1}&queryParam2=${queryParams.queryParam2}`);
  })
});
