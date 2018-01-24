`use strict`

import * as React from "react";
import {MenuIcon} from './MenuIcon';

import '../../scss/base';
var styles = require('../../scss/components/HeaderV2');

export class HeaderV2 extends React.Component<{}, {}> {
  constructor(props:any) {
    console.log("TRIGGER X");
    super(props);
  }

  render() {
    return (
      <div className={styles.hdr}>
        <img src='/ext/img/logo/v2/logo-color.svg' className={styles['logo-container']}/>
        <div className={styles['title-container']}>
          "SIMPLE SMALL STARTUP SITE"
        </div>
        <div className={styles['icon-container']}>
          <MenuIcon icon={'question'} title={'About'}/>
          <MenuIcon icon={'file-text-o'} title={'Blog'}/>
        </div>
      </div>
      );
  }
}
