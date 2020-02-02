import * as React from 'react';
import { mount } from 'enzyme';
import withConnectivity from "../withConnectivity";

const SampleComponent = () => {
  return (
    <div>Sample</div>
  )
}
const successValue = "A";

describe('Creation v2', () => {
  let WithConnectivityComponent;
  beforeEach(() => {
    const mapTokenApi = (result) => ({tokenApi: result});
    WithConnectivityComponent = withConnectivity(mapTokenApi, "A")("/api")(SampleComponent);
  });
  it('renders normally', () => {
    const wrapper = mount(<WithConnectivityComponent/>);
    const sampleProperties = wrapper.find(SampleComponent).props();
    expect(sampleProperties.tokenApi.success).toEqual(successValue);
    expect(sampleProperties.tokenApi.connect).toBeDefined();
    expect(sampleProperties.tokenApi.isLoading).toBe(false);
    expect(sampleProperties.tokenApi.isError).toBe(false);
    expect(sampleProperties.tokenApi.error).toBe("");

    //Not implementing connectivity - i.e. sample.tokenApi.connect({},"").
  })
});
