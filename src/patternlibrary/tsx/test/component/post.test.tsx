import * as React from 'react';
import {Post} from "../../components/Post";
import * as renderer from 'react-test-renderer';

const posts = [
{
  title: 'Who we are',
  text: 'Life is short, and to not know and discover, then there is ' +
        'no purpose to live on.',
  icon: 'quote-right'
}];

test('Post can work', () => {
  const component = renderer.create(
    <Post postItems={posts}/>,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
