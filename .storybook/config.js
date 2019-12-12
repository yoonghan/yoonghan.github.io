import { addParameters, configure } from '@storybook/react';
import { addDecorator } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

function loadStories() {
  const req = require.context('../stories', false , /.+\.story\.[t|j]sx?$/);
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

addParameters({
  options: {
    showPanel: false
  }
});

configure(loadStories, module);
