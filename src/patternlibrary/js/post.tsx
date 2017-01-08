import * as React from "react";
import * as ReactDOM from "react-dom";

import { Post } from "./components/Post";

const posts = [
{
  title: 'Who we are',
  text: 'Life is short, and to not know and discover, then there is ' +
        'no purpose to live on.',
  icon: 'quote-right'
},
{
  title: 'Motives',
  text: 'We are exploring latest technologies that can be implemented into ' +
        'any company. What is more to that, is that we are exploring the ' +
        'missing capabilities in most developers ' +
        '- <strong>understanding both frontend and backend system.</strong>',
  icon: 'wpexplorer'
},
{
  title: 'Other Type',
  text: 'We are exploring latest technologies that can be implemented into ' +
        'any company. What is more to that, is that we are exploring the ' +
        'missing capabilities in most developers ' +
        '- <strong>understanding both frontend and backend system.</strong>',
  icon: 'fala',
  titlePost: true,
  concept: [
    {
      header: 'Startup',
      description: 'As the hosting cloud servers restarted every day, NodeJS speed startup, 2-3 seconds, saved my day.'
    },
    {
      header: 'Styling',
      description: 'Introducing stylus/SASS to the page.'
    },
    {
      header: 'Interactivity',
      description: 'With parallaxing, shows a smoother and more interactive user response.'
    }
  ]
}
]

ReactDOM.render(
  <Post postItems={posts}/>,
  document.getElementById("post")
);
