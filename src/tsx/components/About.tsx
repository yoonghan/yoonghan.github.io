`use strict`

import * as React from 'react';

import '../../scss/components/about';
import '../../patternlibrary/scss/base';

import { Header } from './Header';
import { Footer } from "./Footer";

export class AboutHeader extends React.Component<{}, {}> {
  render() {
    return(
      <Header/>
    );
  }
}

export class AboutFooter extends React.Component<{}, {}> {
  render() {
    return(
      <Footer/>
    );
  }
}
