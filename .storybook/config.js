import { configure } from '@storybook/react';
import { addDecorator } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

function loadStories() {
  require('../stories/index.ts');
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
