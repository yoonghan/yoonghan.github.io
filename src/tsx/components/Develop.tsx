`use strict`

import * as React from 'react';
import { Header } from './Header';
import { DevelopLocale } from '../util/Locale';
import { Button } from 'react-toolbox/lib/button';
import { MeTitleV2 } from '../../patternlibrary/tsx/components/MeTitleV2';
import { Post } from '../../patternlibrary/tsx/components/Post';
import { StickyTitle } from '../../patternlibrary/tsx/components/StickyTitle';
import { ImageOverlay } from '../../patternlibrary/tsx/components/ImageOverlay';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import { Preloader } from "../../patternlibrary/tsx/components/Preloader";

var styles = require('../../scss/components/develop.scss');
import { Footer } from "./Footer";

const locale = new DevelopLocale();

const meTitleInfoProps  = {
  title: locale.translate('title'),
  introSection: {
    title: locale.translate('intro'),
    description: [
      locale.translate('desc.1'),
      locale.translate('desc.2'),
    ]
  }
};

const mePostProps = [
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
];

export class Develop extends React.PureComponent<{}, {}> {
  constructor(props:any) {
    super(props);
  }

  _clickImage = () => {
    const imageOverlayRef = this.refs.overlayRef as ImageOverlay;
    imageOverlayRef.show();
  };

  render() {
    return (
      <div className={styles['develop']}>
        <Preloader/>
        <Header/>
        <MeTitleV2 {...meTitleInfoProps}/>
        <StickyTitle text={locale.translate("title.implementation")} pos={0} />
        <ImageOverlay imageSrc={'/ext/img/develop/workflow.jpg'} ref="overlayRef"/>
        <Card className={styles['card']} raised>
          <CardMedia className={styles['card-image']} aspectRatio="wide" image="/ext/img/develop/workflow.jpg" onClick={this._clickImage}/>
          <CardTitle
            title={"Develop"}
            subtitle={locale.translate("implementation.create")}
          />
          <CardActions>
            <Button label={"Codes"} href="https://github.com/yoonghan/nodejsweb/tree/master/src/patternlibrary" target="impl" theme={styles} primary/>
          </CardActions>
          <CardTitle
            title={"Design"}
            subtitle={locale.translate("implementation.develop")}
          />
          <CardActions>
            <Button label={"Codes"} href="https://github.com/yoonghan/nodejsweb/tree/master/src/" target="impl" theme={styles} primary/>
          </CardActions>
          <CardTitle
            title={"Verify and Optimize"}
            subtitle={locale.translate("implementation.test.build")}
          />
          <CardActions>
            <Button label={"Codes"} href="https://github.com/yoonghan/selfservicecopier" target="impl" theme={styles} primary/>
          </CardActions>
          <CardTitle
            title={"Ready and Go Live"}
            subtitle={locale.translate("implementation.deploy")}
          />
        </Card>
        <StickyTitle text={locale.translate("title.history")} pos={1} />
        <Post postItems={mePostProps}/>
        <Footer/>
      </div>
    );
  }
}
