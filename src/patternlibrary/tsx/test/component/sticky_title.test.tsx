import * as React from 'react';
import {StickyTitle} from "../../components/StickyTitle";
import * as renderer from 'react-test-renderer';

test('StickyTitle can work', () => {
  const component = renderer.create(
    <StickyTitle text="Research" pos={0}/>,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  tree.props.onClick();
});
