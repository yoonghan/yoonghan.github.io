import * as React from 'react';
import { Header } from './Header';
import { MeTitle } from '../../patternlibrary/js/components/MeTitle';
import { Footer } from "./Footer";

const metitleInfo  = {
  title: 'Website Development',
  imgSrc: '/ext/img/logo/logoOnlyWhiteBg.svg',
  introSection: {
    title: 'Introduction',
    description: [
      'The Walcron Coorperation web site has to become a website rich resource, based on known front-end framework or libraries.The ultimate goal is to achieve an out-of-work-environment development.',
      'This website has gone through it\'s 4th iteration with usage of different frameworks or libraries. The UX has gone through various changes as well. Each rewrite of the website is rewritten from scratch, this is to avoid dependencies stacked from previous projects; with the exception of the "About Me" page. For every new iteration made, it does however inherits traits and characteristics from the previous iterations.'
    ]
  },
  posts: [
    {
      title: 'The First',
      icon: 'battery-empty',
      titlePost: true,
      text: 'As a start-off, the site was wrote in vanillaJS. The site was ported from Tomcat to Wildfly, JBoss to vert.x web servers. The latter created the realization on importance on non-block I/O services, which marks for 2nd iteration.'
    },
    {
      title: 'Second Iteration',
      icon: 'battery-1',
      titlePost: true,
      text: 'Again the second site was wrote with vanillaJS, but few features were added in. Firstly it ran on NodeJS and the site is already using UX of parallax.However it was displaying some slow rendering.',
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
    },
    {
      title: 'Third Iteration',
      icon: 'battery-2',
      titlePost: true,
      text: 'Rewrote under NodeJS again, but introduced a pattern library for JS/CSS references. A beta version of AngularJS 2 was used in some of the developed pages.',
      concept: [
        {
          header: 'Reference',
          description: 'Introducing pattern library within the JS was easier to debug. However, plugin becomes a problem.'
        },
        {
          header: 'Experimental Technology',
          description: 'Even as beta, Angular 2 concept was good and easy and solve some pattern library issues.'
        },
        {
          header: 'Material Design',
          description: 'Rewriting material design from Google\'s material view into AngularJS was challenging, but achieved it.'
        },
        {
          header: 'Static Typings',
          description: 'Created JS modules are now static typed and sound checked.'
        },
        {
          header: 'Library Loading',
          description: 'We mixed usage of both CommonJS and ES6 loading modules in this iteration.'
        },
        {
          header: 'Harmony',
          description: 'Created themes to create better harmonization.'
        },
        {
          header: 'Routing',
          description: 'Using the famous Angular routing to create and SPA. But this badly affects the SEO, which is decidedly to be dropped on fourth iteration.'
        }
      ]
    },
    {
      title: 'Fourth Iteration',
      icon: 'battery-3',
      titlePost: true,
      text: 'Given the experience with AngularJS2 and React Native on this round; we decided to go with ReactJS. The transition and the concept of ReactJS blew what we had in our previous, 3rd, iteration.',
      concept: [
        {
          header: 'Reference',
          description: 'Plug and play by creating modules in pattern library to the actual project is easy and robust.'
        },
        {
          header: 'Latest Technology',
          description: 'Pushing boundaries to use even PostCSS!'
        },
        {
          header: 'Heaven of Plugins',
          description: 'Libraries are vast and easy to grasp.'
        },
        {
          header: 'Faster Library Loading',
          description: 'Improved loading even more with webpack bundling.'
        },
        {
          header: 'Modular',
          description: 'Everything was broken into small modules in patternlibrary, including CSS, making it extremely managable.'
        }
      ]
    }
  ]
};

export class Develop extends React.Component<{}, {}> {
    render() {
        return (
          <div>
            <Header/>
            <MeTitle {...metitleInfo}/>
            <Footer/>
          </div>
        );
    }
}
