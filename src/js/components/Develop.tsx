`use strict`

import * as React from 'react';
import { Header } from './Header';
import { DevelopLocale } from '../util/Locale';
import { MeTitle } from '../../patternlibrary/js/components/MeTitle';
import { Footer } from "./Footer";

const locale = new DevelopLocale();

const metitleInfo  = {
  title: locale.translate('title'),
  imgSrc: '/ext/img/logo/logoOnlyWhiteBg.svg',
  introSection: {
    title: locale.translate('intro'),
    description: [
      locale.translate('desc.1'),
      locale.translate('desc.2'),
    ]
  },
  posts: [
    {
      title: locale.translate('first'),
      icon: 'battery-empty',
      titlePost: true,
      text: locale.translate('first.text')
    },
    {
      title: locale.translate('second'),
      icon: 'battery-1',
      titlePost: true,
      text: locale.translate('second.text'),
      concept: [
        {
          header: locale.translate('second.1.title'),
          description: locale.translate('second.1.desc')
        },
        {
          header: locale.translate('second.2.title'),
          description: locale.translate('second.2.desc')
        },
        {
          header: locale.translate('second.3.title'),
          description: locale.translate('second.3.desc')
        }
      ]
    },
    {
      title: locale.translate('third'),
      icon: 'battery-2',
      titlePost: true,
      text: locale.translate('third.text'),
      concept: [
        {
          header: locale.translate('third.1.title'),
          description: locale.translate('third.1.desc')
        },
        {
          header: locale.translate('third.2.title'),
          description: locale.translate('third.2.desc')
        },
        {
          header: locale.translate('third.3.title'),
          description: locale.translate('third.3.desc')
        },
        {
          header: locale.translate('third.4.title'),
          description: locale.translate('third.4.desc')
        },
        {
          header: locale.translate('third.5.title'),
          description: locale.translate('third.5.desc')
        },
        {
          header: locale.translate('third.6.title'),
          description: locale.translate('third.6.desc')
        },
        {
          header: locale.translate('third.7.title'),
          description: locale.translate('third.7.desc')
        }
      ]
    },
    {
      title: locale.translate('fourth'),
      icon: 'battery-3',
      titlePost: true,
      text: locale.translate('fourth.text'),
      concept: [
        {
          header: locale.translate('fourth.1.title'),
          description: locale.translate('fourth.1.desc')
        },
        {
          header: locale.translate('fourth.2.title'),
          description: locale.translate('fourth.2.desc')
        },
        {
          header: locale.translate('fourth.3.title'),
          description: locale.translate('fourth.3.desc')
        },
        {
          header: locale.translate('fourth.4.title'),
          description: locale.translate('fourth.4.desc')
        },
        {
          header: locale.translate('fourth.5.title'),
          description: locale.translate('fourth.5.desc')
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
