import { storiesOf } from '@storybook/react';
import MiniPost from './basic_component/MiniPost.story';
import Post from './basic_component/Post.story';

const stories = storiesOf('Basic', module);
stories.add('Mini post', MiniPost);
stories.add('Post', Post);
