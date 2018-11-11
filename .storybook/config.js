import { configure } from '@storybook/react';
import { addDecorator } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

function loadStories() {
  const req = require.context('../stories', false , /.+\.story\.tsx?$/);
  req.keys().forEach(req);
  // You can require as many stories as you need.
}

addDecorator(
  withInfo({
    inline: true,
    header: false,
    source: true
  })
);

configure(loadStories, module);
