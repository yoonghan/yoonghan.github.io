`use strict`

import * as React from "react";
import * as ReactDOM from "react-dom";

import { Gallery } from "./components/Gallery";

const items = [
	{title: 'Node.js',
		imgSrc: '/ext/img/technology/nodejs.png',
		nature:['webserver', 'javascript'], key:'Extremely fast, Non-blocking, Efficient',
		desc:'I need a fast startup server as the cloud hosting shuts down the application every night. This server serves this purpose, and it is blazing fast as well. Node.js is used along with Express plugin.'},
	{title: 'React',
    imgSrc: '/ext/img/technology/react.png',
    nature:['library', 'javascript'], key:'Simplicity, Elimination of MVC pattern, Fast',
    desc:'Similar to AngularJS2, the key features for React is to create modular components in Javascript for reuse. The learning curve for React is steep to grasp, once understood, it is even easier compared to AngularJS.'},
	{title: 'Sass',
    imgSrc: '/ext/img/technology/sass.png',
    nature:['library', 'css'], key:'Familiarity, Readability',
    desc:'It\'s easy to nest the CSS usages. The codes however are tied closely with PostCSS, which is planned in next migration.'},
	{title: 'Typescript 2.0',
    imgSrc: '/ext/img/technology/typescript.png',
    nature:['compiler', 'javascript'], key:'Type safety check',
    desc:'Compiler checking detects error faster and helps alot in javascript development. JSX which needs to be compiled in ReactJS benefits alot from this.'},
	{title: 'CommonJS',
		imgSrc: '/ext/img/technology/commonjs.png',
		nature:['library', 'javascript'], key:'Eases Library Imports',
		desc:'Had been using CommonJS as the writing based of all Javascripts. Dropped AMD and SystemJS loading in this development iteration.'},
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
		desc:'Was using SystemJS (ES6 polyfiller) on the previous iteration, but webpack delves into serious business, hence the usage.'},
	{title: 'Gulp',
		imgSrc: '/ext/img/technology/gulp.png',
		nature:['compiler', 'build'], key:'Easy, Fast',
		desc:'Still using gulp in parallel with the use of webpack as there are still functionalities for required compilers, i.e. Pug.'},
	{title: 'Pug / Jade',
		imgSrc: '/ext/img/technology/pug.svg',
		nature:['compiler', 'html'], key:'Easy, Readability',
		desc:'I loved Jade which is now renamed as Pug. The usage has been trimmed down to minimal due to JSX usage. It\'s still fun to write in Pug.'},
	{title: 'Animate.css',
		imgSrc: '/ext/img/technology/npm.png',
		nature:['css', 'library'], key:'Lightweight, Easy',
		desc:'Gone are the days where CSS animations are slower than Javascript. The best thing with this library is that it is pure CSS without the hassle of javascript plugin.'}
];

ReactDOM.render(
    <Gallery items={items}/>,
    document.getElementById("gallery")
);
