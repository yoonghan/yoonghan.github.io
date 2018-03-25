`use strict`

import * as React from 'react';
import { Header } from './Header';
import { Footer } from "./Footer";
import { TechnologyLocale } from '../util/Locale';
import { MeTitleV2 } from '../../patternlibrary/tsx/components/MeTitleV2';
import { Gallery } from '../../patternlibrary/tsx/components/Gallery';
import { Preloader } from "../../patternlibrary/tsx/components/Preloader";

var styles = require('../../scss/components/index.scss');
declare function require(path: string): any;

const locale = new TechnologyLocale();

const items = [
	{title: 'Node.js',
		imgSrc: '/ext/img/technology/nodejs.png',
		nature:['webserver', 'javascript'],
		key: locale.translate('node.key'),
		desc: locale.translate('node.desc')},
	{title: 'React',
    imgSrc: '/ext/img/technology/react.png',
    nature:['library', 'javascript'],
		key: locale.translate('react.key'),
    desc: locale.translate('react.desc')},
	{title: 'Sass',
    imgSrc: '/ext/img/technology/sass.png',
    nature:['library', 'css'],
		key: locale.translate('sass.key'),
    desc: locale.translate('sass.desc')},
	{title: 'Typescript 2.0',
    imgSrc: '/ext/img/technology/typescript.png',
    nature:['compiler', 'javascript'],
		key: locale.translate('typescript.key'),
    desc: locale.translate('typescript.desc')},
	{title: 'CommonJS',
		imgSrc: '/ext/img/technology/commonjs.png',
		nature:['library', 'javascript'],
		key: locale.translate('common.key'),
		desc: locale.translate('common.desc')},
	{title: 'React Toolbox',
		imgSrc: '/ext/img/technology/reacttoolbox.svg',
		nature:['library', 'javascript', 'plugin'],
		key: locale.translate('reacttoolbox.key'),
		desc: locale.translate('reacttoolbox.desc')},
	{title: 'Font Awesome',
		imgSrc: '/ext/img/technology/fontawesome.jpg',
		nature:['fonts', 'plugin'],
		key: locale.translate('fontawesome.key'),
		desc: locale.translate('fontawesome.desc')},
	{title: 'Webpack',
		imgSrc: '/ext/img/technology/webpack.png',
		nature:['compiler', 'build'],
		key: locale.translate('webpack.key'),
		desc: locale.translate('webpack.desc')},
	{title: 'Gulp',
		imgSrc: '/ext/img/technology/gulp.png',
		nature:['compiler', 'build'],
		key: locale.translate('gulp.key'),
		desc: locale.translate('gulp.desc')},
	{title: 'Pug / Jade',
		imgSrc: '/ext/img/technology/pug.svg',
		nature:['compiler', 'html'],
		key: locale.translate('pug.key'),
		desc: locale.translate('pug.desc')},
	{title: 'Animate.css',
		imgSrc: '/ext/img/technology/npm.png',
		nature:['css', 'library'],
		key: locale.translate('animate.key'),
		desc: locale.translate('animate.desc')},
	{title: 'Precache',
		imgSrc: '/ext/img/technology/npm.png',
		nature:['javascript', 'non Internet Explorer'],
		key: locale.translate('precache.key'),
		desc: locale.translate('precache.desc')},
	{title: 'Jest',
		imgSrc: '/ext/img/technology/jest.png',
		nature:['javascript', 'testing kit'],
		key: locale.translate('jest.key'),
		desc: locale.translate('jest.desc')}
];

const metitleInfo  = {
  title: locale.translate('title'),
  introSection: {
    title: locale.translate('subtitle'),
    description: [
      locale.translate('desc')
    ]
  }
}

export class Technology extends React.PureComponent<{}, {}> {
	constructor(props:any) {
    super(props);
    this.state = {
      offlineSuccessful: false
    }
  }

  render() {
    return (
      <div>
				<Preloader/>
        <Header/>
        <MeTitleV2 {...metitleInfo}/>
        <Gallery items={items}/>
        <Footer/>
      </div>
    );
  }
}
