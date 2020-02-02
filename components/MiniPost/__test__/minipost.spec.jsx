import * as React from 'react';
import { shallow } from 'enzyme';
import MiniPost from "../index";

const menuItems = [
  <React.Fragment/>,
  <div></div>,
  <div>Non Empty</div>
]

describe('MiniPost', () => {
  it('renders normally', () => {
    const wrapper = shallow(
      <MiniPost
      title="title1"
      text="text1"
      titlePost="titlePost"
      concept={[
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
