import * as React from 'react';
import { shallow } from 'enzyme';
import ButtonsBar from "../index";

describe('ButtonsBar', () => {
  it('renders normally', () => {
    const sampleMenus = [
      {
        title: "Title_1",
        link: "Link_1"
      },
      {
        title: "Title_2",
        link: "Link_2"
      },
      {
        title: "Title_3",
        link: "Link_3"
      }
    ]

    const wrapper = shallow(
      <ButtonsBar activeIndex={1} menuTexts={sampleMenus}/>
    );
    expect(wrapper.debug()).toMatchSnapshot();
  })
});
