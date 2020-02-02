import * as React from 'react';
import { shallow } from 'enzyme';
import Post from "../index";

describe('Post', () => {
  it('renders normally', () => {
    const wrapper = shallow(
      <Post
        postItems={[
          {
            header: "header1",
            description: "description1"
          },
          {
            header: "header2",
            description: "description2"
          }
        ]}
      />
    );
    expect(wrapper.debug()).toMatchSnapshot();
  })
});
