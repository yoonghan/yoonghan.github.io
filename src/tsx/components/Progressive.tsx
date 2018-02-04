`use strict`

import * as React from 'react';
import { Header } from './Header';
import { ProgressiveLocale } from '../util/Locale';
import { MeTitleV2 } from '../../patternlibrary/tsx/components/MeTitleV2';
import { Post } from '../../patternlibrary/tsx/components/Post';
import { StickyTitle } from '../../patternlibrary/tsx/components/StickyTitle';
import { Footer } from "./Footer";
import { ProgressiveButton } from "../../patternlibrary/tsx/components/ProgressiveButton";

const locale = new ProgressiveLocale();

const progressiveProp = {
  ready: locale.translate('ready'),
  notsupported: locale.translate('notsupported'),
  installing: locale.translate('installing'),
  installed: locale.translate('installed'),
  alreadyInstalled: locale.translate('alreadyInstalled'),
  updating: locale.translate('updating'),
  failed: locale.translate('failed')
}

const progressiveInfo  = {
  title: locale.translate('title'),
  introSection: {
    description: [
      locale.translate('desc.1'),
      locale.translate('desc.2'),
    ]
  }
};

const offlineInfo1 = [
{
  title: locale.translate('offline.title.step1'),
  text: locale.translate('offline.desc.step1'),
  icon: 'circle'
},
{
  title: locale.translate('offline.title.step2'),
  text: locale.translate('offline.desc.step2'),
  icon: 'circle'
}]

const offlineInfo2 = [
{
  title: locale.translate('offline.title.step3'),
  text: locale.translate('offline.desc.step3'),
  icon: 'circle'
}]

interface ProgressiveState {
  offlineSuccessful: boolean;
}

export class Progressive extends React.Component<{}, ProgressiveState> {

  constructor(props:any) {
    super(props);
    this.state = {
      offlineSuccessful: false
    }
  }

  handleSuccessfulCall = () => {
    this.setState({
      offlineSuccessful: true
    })
  };

  render() {
    return (
      <div>
        <Header/>
        <MeTitleV2 {...progressiveInfo}/>
        <StickyTitle text={locale.translate('offline.stickytitle')} pos={0} />
        <Post postItems={offlineInfo1}/>
        <ProgressiveButton {...progressiveProp} successfulCallback={this.handleSuccessfulCall}/>
        {this.state.offlineSuccessful &&
          <Post postItems={offlineInfo2}/>
        }
        <br/><br/><br/>
        <Footer/>
      </div>
    );
  }
}
