import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

const stories = storiesOf('Welcome', module);

const info = withInfo({ inline: true, source: true });

stories.add('TypeScript React Storybook', info(() => {
 return (
   <div>
   This is the storybook created specifically for Walcron components.
   Previously this was a pattern library that has now been moved into Storybook plugin.
   </div>
 );
}));
