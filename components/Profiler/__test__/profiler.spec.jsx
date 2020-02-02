import * as React from 'react';
import { shallow } from 'enzyme';
import Profiler from "../index";

describe('Profiler', () => {
  it('renders normally', () => {
    const wrapper = shallow(
      <Profiler
        profiles={[
          {
            name: "name1",
            description: <div/>,
            imgSrc: "imgSrc1"
          },
          {
            name: "name2",
            description: <div/>,
            imgSrc: "imgSrc2"
          }
        ]}
      />
    );
    expect(wrapper.debug()).toMatchSnapshot();
  })
});
