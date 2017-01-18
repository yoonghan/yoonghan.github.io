import * as React from 'react';
import { Header } from './Header';
import { Footer } from "./Footer";
import { MeTitle } from '../../patternlibrary/js/components/MeTitle';
import { Gallery } from '../../patternlibrary/js/components/Gallery';

var styles = require('../../css/components/index');
declare function require(path: string): any;

const items = [
	{title: 'Node.js',
		imgSrc: '/ext/img/technology/nodejs.png',
		nature:['webserver', 'javascript'], key:'Extremely fast, Non-blocking, Efficient',
		desc:'We needed a fast startup server as the cloud hosting we are using shuts down the application every night. This server serves this purpose, and it is blazing fast as well. NPM is the other key function we relied for development.'},
	{title: 'React',
    imgSrc: '/ext/img/technology/react.png',
    nature:['library', 'javascript'], key:'Simplicity, Elimination of MVC pattern, Fast',
    desc:'Similar to AngularJS2, the key features for React is to create modular components in Javascript for reuse. The learning curve for React is steep to grasp, once understood, it is easy.'},
	{title: 'Sass',
    imgSrc: '/ext/img/technology/sass.png',
    nature:['library', 'css'], key:'Familiarity, Readability',
    desc:'Created based on modular CSS. The codes however are tied closely with PostCSS, which are within the planned migration.'},
	{title: 'Typescript 2.0',
    imgSrc: '/ext/img/technology/typescript.png',
    nature:['compiler', 'javascript'], key:'Type safety check',
    desc:'Compiler checking detects error faster and helps alot in javascript development. JSX which needs to be compiled for ReactJS benefited alot on this.'},
	{title: 'CommonJS',
		imgSrc: '/ext/img/technology/commonjs.png',
		nature:['library', 'javascript'], key:'Eases Library Imports',
		desc:'Had been using CommonJS as the writing based of all Javascripts. Had used this with SystemJS and AMD loads before, now, with react and webpack, a common library is used instead.'},
	{title: 'React Toolbox',
		imgSrc: '/ext/img/technology/reacttoolbox.svg',
		nature:['library', 'javascript', 'plugin'], key:'Material Design Layouts, Simple',
		desc:'This is the closest react plugin for material design, the one big thing I really missing shifting away from Angular.'},
	{title: 'Font Awesome',
		imgSrc: '/ext/img/technology/fontawesome.jpg',
		nature:['fonts', 'plugin'], key:'Big Library, Awesome!',
		desc:'Most of the font icons are based on this with some pointing into Google libraries for Material Design fonts.'},
	{title: 'Webpack',
		imgSrc: '/ext/img/technology/webpack.png',
		nature:['compiler', 'build'], key:'Vast plugins and Bundle',
		desc:'Was using SystemJS (ES6 polyfiller) on the previous iteration, but webpack bundles file better. Hopefully ES6 import becomes more available to new browsers.'},
	{title: 'Gulp',
		imgSrc: '/ext/img/technology/gulp.png',
		nature:['compiler', 'build'], key:'Easy, Fast',
		desc:'Still using gulp in parallel with the use of webpack as there are still functionalities for required compilers, i.e. Pug.'},
	{title: 'Pug / Jade',
		imgSrc: '/ext/img/technology/pug.svg',
		nature:['compiler', 'html'], key:'Easy, Readability',
		desc:'I loved Jade which is now renamed as Pug. The usage has been trimmed down to minimal due to JSX usage. Nevertheless, it\'s still fun to write in Pug.'},
	{title: 'Animate.css',
		imgSrc: '/ext/img/technology/npm.png',
		nature:['css', 'library'], key:'Lightweight, Easy',
		desc:'Gone are the days where CSS animations are slower than Javascript. The best thing with this library is that it is pure CSS without the hassle of javascript plugin.'},
	{title: 'React Slick',
		imgSrc: '/ext/img/technology/npm.png',
		nature:['plugin', 'library', 'javascript'], key:'Stable, Fast, Animated',
		desc:'An all-ready plugin written in React, that is stable and provides the needed carousel function. Though I\'ve plan to rewrite a custom carousel.'}
];

const metitleInfo  = {
  title: 'Development Technology',
  imgSrc: '/ext/img/logo/logoOnlyWhiteBg.svg',
  introSection: {
    title: 'Fullstack Development',
    description: [
      'These are the technologies used currently for development for this website. '+
      'We had used many other technologies in our past, but moving forward we do want to try other technologies and tools as every tools created serves a desired purpose. :)'
    ]
  }
}

export class Technology extends React.Component<{}, {}> {
    render() {
        return (
          <div>
            <Header/>
            <MeTitle {...metitleInfo}/>
            <Gallery items={items}/>
            <Footer/>
          </div>
        );
    }
}
