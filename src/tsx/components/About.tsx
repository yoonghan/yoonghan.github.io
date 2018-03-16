`use strict`

import * as React from 'react';

import '../../scss/components/about.scss';
import '../../patternlibrary/scss/base.scss';

import { Header } from './Header';
import { Footer } from "./Footer";

export class AboutHeader extends React.PureComponent<{}, {}> {
  render() {
    return(
      <Header/>
    );
  }
}

export class AboutFooter extends React.PureComponent<{}, {}> {
  render() {
    return(
      <Footer/>
    );
  }
}
