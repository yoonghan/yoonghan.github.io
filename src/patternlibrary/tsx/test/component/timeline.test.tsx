import * as React from 'react';
import {Timeline} from "../../components/Timeline";
import * as renderer from 'react-test-renderer';

const timelines = [
  { year: 2016},
  {
    title: "Test",
    image: "https://placeimg.com/640/250/tech",
    altImage: "https://placeimg.com/640/250/tech",
    description: "Description",
    linkArray: [
      {
        text: "text",
        path: "path"
      }
    ]
  },
  { year: 2015},
  {
    title: "Test",
    image: "https://placeimg.com/640/250/tech",
    description: "Description",
    linkArray: [
      {
        text: "text",
        path: "path"
      }
    ]
  },
  {
    title: "Test",
    image: "https://placeimg.com/640/250/tech",
    description: "Description",
    linkArray: [
      {
        text: "text",
        path: "path"
      }
    ]
  }
];

test('Timeline is alternate left right, unaffected by year', () => {
  const component = renderer.create(
    <Timeline postArray = {timelines}/>,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
