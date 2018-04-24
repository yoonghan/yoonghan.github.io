`use strict`

import * as React from 'react';
import { IndexLocale } from '../util/Locale';
import { UtilLocale } from "../../patternlibrary/tsx/util/UtilLocale";
import { MainScreenV2 } from '../../patternlibrary/tsx/components/MainScreenV2';
import { Post } from '../../patternlibrary/tsx/components/Post';
import { Midpart } from '../../patternlibrary/tsx/components/Midpart';
import { StickyTitle } from '../../patternlibrary/tsx/components/StickyTitle';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import { Timeline } from "../../patternlibrary/tsx/components/Timeline";
import { Button } from 'react-toolbox/lib/button';
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Preloader } from "../../patternlibrary/tsx/components/Preloader";

var styles = require('../../scss/components/index.scss');
declare function require(path: string): any;

const locale = new IndexLocale();

const conceptPosts = [
{
  title: locale.translate('post.1.title'),
  description: locale.translate('post.1.text')
},
{
  title: locale.translate('post.2.title'),
  description: locale.translate('post.2.text')
},
{
  title: locale.translate('post.3.title'),
  description: locale.translate('post.3.text')
}];

const mainScreenProps = {
  mainScreenV2Text: locale.translate('header.text'),
  mainScreenV2ConceptText: locale.translate('header.concepttext'),
  mainScreenV2Description: locale.translate('header.description'),
  mainScreenV2BtnText: locale.translate('header.button'),
  mainScreenV2BtnLink: '/about'
};

const GithubIcon = () => (
  <svg viewBox="0 0 284 277">
    <g><path d="M141.888675,0.0234927555 C63.5359948,0.0234927555 0,63.5477395 0,141.912168 C0,204.6023 40.6554239,257.788232 97.0321356,276.549924 C104.12328,277.86336 106.726656,273.471926 106.726656,269.724287 C106.726656,266.340838 106.595077,255.16371 106.533987,243.307542 C67.0604204,251.890693 58.7310279,226.56652 58.7310279,226.56652 C52.2766299,210.166193 42.9768456,205.805304 42.9768456,205.805304 C30.1032937,196.998939 43.9472374,197.17986 43.9472374,197.17986 C58.1953153,198.180797 65.6976425,211.801527 65.6976425,211.801527 C78.35268,233.493192 98.8906827,227.222064 106.987463,223.596605 C108.260955,214.426049 111.938106,208.166669 115.995895,204.623447 C84.4804813,201.035582 51.3508808,188.869264 51.3508808,134.501475 C51.3508808,119.01045 56.8936274,106.353063 65.9701981,96.4165325 C64.4969882,92.842765 59.6403297,78.411417 67.3447241,58.8673023 C67.3447241,58.8673023 79.2596322,55.0538738 106.374213,73.4114319 C117.692318,70.2676443 129.83044,68.6910512 141.888675,68.63701 C153.94691,68.6910512 166.09443,70.2676443 177.433682,73.4114319 C204.515368,55.0538738 216.413829,58.8673023 216.413829,58.8673023 C224.13702,78.411417 219.278012,92.842765 217.804802,96.4165325 C226.902519,106.353063 232.407672,119.01045 232.407672,134.501475 C232.407672,188.998493 199.214632,200.997988 167.619331,204.510665 C172.708602,208.913848 177.243363,217.54869 177.243363,230.786433 C177.243363,249.771339 177.078889,265.050898 177.078889,269.724287 C177.078889,273.500121 179.632923,277.92445 186.825101,276.531127 C243.171268,257.748288 283.775,204.581154 283.775,141.912168 C283.775,63.5477395 220.248404,0.0234927555 141.888675,0.0234927555" /></g>
  </svg>
);

const GoogleIcon = () => (
  <svg viewBox="0 0 272 92" style={{width: '100px'}}>
  <path fill="#EA4335" d="M115.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18C71.25 34.32 81.24 25 93.5 25s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44S80.99 39.2 80.99 47.18c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z"/><path fill="#FBBC05" d="M163.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-12.85 9.99-22.18 22.25-22.18s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44s-12.51 5.46-12.51 13.44c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z"/><path fill="#4285F4" d="M209.75 26.34v39.82c0 16.38-9.66 23.07-21.08 23.07-10.75 0-17.22-7.19-19.66-13.07l8.48-3.53c1.51 3.61 5.21 7.87 11.17 7.87 7.31 0 11.84-4.51 11.84-13v-3.19h-.34c-2.18 2.69-6.38 5.04-11.68 5.04-11.09 0-21.25-9.66-21.25-22.09 0-12.52 10.16-22.26 21.25-22.26 5.29 0 9.49 2.35 11.68 4.96h.34v-3.61h9.25zm-8.56 20.92c0-7.81-5.21-13.52-11.84-13.52-6.72 0-12.35 5.71-12.35 13.52 0 7.73 5.63 13.36 12.35 13.36 6.63 0 11.84-5.63 11.84-13.36z"/><path fill="#34A853" d="M225 3v65h-9.5V3h9.5z"/><path fill="#EA4335" d="M262.02 54.48l7.56 5.04c-2.44 3.61-8.32 9.83-18.48 9.83-12.6 0-22.01-9.74-22.01-22.18 0-13.19 9.49-22.18 20.92-22.18 11.51 0 17.14 9.16 18.98 14.11l1.01 2.52-29.65 12.28c2.27 4.45 5.8 6.72 10.75 6.72 4.96 0 8.4-2.44 10.92-6.14zm-23.27-7.98l19.82-8.23c-1.09-2.77-4.37-4.7-8.23-4.7-4.95 0-11.84 4.37-11.59 12.93z"/><path fill="#4285F4" d="M35.29 41.41V32H67c.31 1.64.47 3.58.47 5.68 0 7.06-1.93 15.79-8.15 22.01-6.05 6.3-13.78 9.66-24.02 9.66C16.32 69.35.36 53.89.36 34.91.36 15.93 16.32.47 35.3.47c10.5 0 17.98 4.12 23.6 9.49l-6.64 6.64c-4.03-3.78-9.49-6.72-16.97-6.72-13.86 0-24.7 11.17-24.7 25.03 0 13.86 10.84 25.03 24.7 25.03 8.99 0 14.11-3.61 17.39-6.89 2.66-2.66 4.41-6.46 5.1-11.65l-22.49.01z"/>
  </svg>
);

const timelines = [
  { year: 2018},
  {
    title: locale.translate('card.201804.title'),
    description: locale.translate('card.201804.desc')
  },
  {
    title: locale.translate('card.12.title'),
    description: locale.translate('card.12.desc')
  },
  {
    title: locale.translate('card.11.title'),
    description: locale.translate('card.11.desc'),
    linkArray: [
      {
        text: locale.translate('label.read'),
        path: "https://github.com/yoonghan/presentation/tree/master/2017"
      }
    ]
  },
  { year: 2017},
  {
    title: locale.translate('card.10.title'),
    image: "/ext/img/index/hackathon_solutiondiagram.jpg",
    altImage: "/ext/img/index/hackathon_solutiondiagram.png",
    description: locale.translate('card.10.desc'),
    linkArray: [
      {
        text: locale.translate('vote.result'),
        path: "/ext/img/index/vote_result.png"
      },
      {
        text: locale.translate('label.download') + '-Client',
        path: "https://github.com/yoonghan/HackathonMobileApp"
      },
      {
        text: locale.translate('label.download') + '-Server',
        path: "https://github.com/yoonghan/HackathonBridge"
      }
    ]
  },
  {
    title: locale.translate('card.0.title'),
    image: "/ext/img/index/designthinking.jpg",
    description: locale.translate('card.0.desc')
  },
  { year: 2016},
  {
    title: locale.translate('card.1.title'),
    description: locale.translate('card.1.desc'),
    linkArray: [
      {
        text: locale.translate('label.read'),
        path: "http://blog.walcron.com"
      }
    ]
  },
  {
    title: locale.translate('card.3.title'),
    description: locale.translate('card.3.desc'),
    linkArray: [
      {
        text: locale.translate('label.read'),
        path: UtilLocale.getLocalizedHref('progressive')
      }
    ]
  },
  {
    title: locale.translate('card.22.title'),
    description: locale.translate('card.22.desc')
  },
  {
    title: locale.translate('card.21.title'),
    description: locale.translate('card.21.desc')
  },
  {
    title: locale.translate('card.2.title'),
    description: locale.translate('card.2.desc')
  },
  {
    title: locale.translate('card.31.title'),
    description: locale.translate('card.31.desc')
  },
  { year: 2015},
  {
    title: locale.translate('card.43.title'),
    description: locale.translate('card.43.desc')
  },
  {
    title: locale.translate('card.4.title'),
    description: locale.translate('card.4.desc')
  },
  {
    title: locale.translate('card.41.title'),
    description: locale.translate('card.41.desc'),
    linkArray: [
      {
        text: locale.translate('label.read'),
        path: 'https://github.com/yoonghan/selfservice'
      }
    ]
  },
  { year: 2014},
  {
    title: locale.translate('card.42.title'),
    description: locale.translate('card.42.desc')
  }
];

export class Index extends React.PureComponent<{}, {}> {
  constructor(props:any) {
    super(props);
  }

  render() {
    return (
      <div className={styles['reacttoolbox']}>
        <Preloader/>
        <Header isHomepage={true}/>
        <MainScreenV2 {...mainScreenProps}/>
        <Midpart conceptArray={conceptPosts}/>
        <div className="posting">
          <StickyTitle text={locale.translate('title.research')} pos={0} />
          <div className={styles['card-section']}>
            <Timeline postArray={timelines}/>
          </div>
          <StickyTitle text={locale.translate('title.development')} pos={1} />
          <div className={styles['card-section']}>
            <Card className={styles['card-split']} raised>
              <CardTitle
                title={locale.translate('card.5.title')}
                subtitle={locale.translate('card.5.desc')}
              />
              <CardActions>
                <Button href='https://github.com/yoonghan' theme={styles} primary>
                  <GithubIcon /> Github
                </Button>
              </CardActions>
            </Card>
            <Card className={styles['card-split']} raised>
              <CardTitle
                title={locale.translate('card.6.title')}
                subtitle={locale.translate('card.6.desc')}
              />
              <CardActions>
                <Button href='https://play.google.com/store/apps/details?id=com.walcron.hanleewan.weddingplanner' target='playstore' theme={styles} primary>
                  <i className={"fa fa-google"} aria-hidden="true"></i> Playstore
                </Button>
                <Button href='https://play.google.com/store/apps/details?id=com.theezpost.postcard' target='playstore' theme={styles} primary>
                  <i className={"fa fa-google"} aria-hidden="true"></i> Playstore
                </Button>
              </CardActions>
            </Card>
            <Card className={styles['card-split']} raised>
              <CardTitle
                title={locale.translate('card.7.title')}
                subtitle={locale.translate('card.7.desc')}
              />
              <CardActions>
                <Button href='https://github.com/yoonghan' theme={styles} primary>
                  <GithubIcon /> Github
                </Button>
              </CardActions>
            </Card>
          </div>
        </div>
        <Footer isHomepage={true}/>
      </div>
    );
  }
}
