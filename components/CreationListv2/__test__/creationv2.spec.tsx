import * as React from 'react';
import { shallow } from 'enzyme';
import Creation from "../index";



const cards = [
  {
    id: "1",
    link: "link1",
    title: "title1",
    desc: "desc1",
    gitLink: "gitlink1",
    screenshot: "img1",
    imgSrc: "imgSrc1",
    usage: "desc1",
    internal: true
  },
  {
    id: "2",
    link: "link2",
    title: "title2",
    desc: "desc2",
    screenshot: "img2",
    imgSrc: "imgSrc2",
    usage: "desc2\ndesc2_2\ndesc2_3",
    internal: false
  }
];

describe('Creation v2', () => {
  it('renders normally', () => {
    const wrapper = shallow(<Creation cards={cards}/>);
    expect(wrapper.debug()).toMatchSnapshot();
  })
});
