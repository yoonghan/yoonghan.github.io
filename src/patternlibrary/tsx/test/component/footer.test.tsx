import * as React from 'react';
import {FooterV2} from "../../components/FooterV2";
import * as renderer from 'react-test-renderer';

const links = [
  {
    text: 'About',
    path: '/about'
  }
];

//**Produces warning https://github.com/facebook/react/issues/11808**//
test('Footer can work', () => {
  const component = renderer.create(
    <FooterV2 updatedYear={2018} linkArray={links} contactInformation={'Shit just got better.'}/>,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
