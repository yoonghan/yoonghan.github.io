`use strict`

import * as React from "react";
import {MenuDropV2} from './MenuDropV2';
import {LocaleSelector, LocaleSelectorTypes} from './LocaleSelector';

import '../../scss/base.scss';
var styles = require('../../scss/components/HeaderV2.scss');

interface ILinks {
  icon: string;
  title: string;
  path: string;
}

export interface HeaderV2Props {
  linkArray: Array<ILinks>;
  isHomepage?: boolean;
}

export class HeaderV2 extends React.PureComponent<HeaderV2Props, {}> {
  constructor(props:any) {
    super(props);
  }

  clickAndReturnHome = () => {
    window.location.href = "/";
  }

  render() {
    return (
      <div style={{backgroundColor: '#fff'}}>
        <div className={styles.hdr}>
          <img src='/ext/img/logo/v2/logo-color.svg' className={styles['logo-container']} onClick={this.clickAndReturnHome}/>
          <div className={styles['title-container']}>
            <LocaleSelector type={LocaleSelectorTypes.Link}/>
          </div>
        </div>
      </div>
      );
  }
}
