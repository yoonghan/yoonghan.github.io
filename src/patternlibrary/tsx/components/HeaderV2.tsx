`use strict`

import * as React from "react";
import {MenuIcon} from './MenuIcon';
import {LocaleSelector, LocaleSelectorTypes} from './LocaleSelector';

import '../../scss/base';
var styles = require('../../scss/components/HeaderV2');

interface ILinks {
  icon: string;
  title: string;
  path: string;
}

export interface HeaderV2Props {
  linkArray: Array<ILinks>;
}

export class HeaderV2 extends React.Component<HeaderV2Props, {}> {
  constructor(props:any) {
    super(props);
  }

  generateIcons = (links:Array<ILinks>) => {
    const linkAsHtml = links.map(
      (linkItem) => {
        const {title, path, icon} =  linkItem;
        return (
          <MenuIcon icon={icon} title={title} key={title} path={path}/>
        );
      }
    );
    return linkAsHtml
  };

  clickAndReturnHome = () => {
    window.location.href = "/";
  }

  render() {
    const generatedIcons = this.generateIcons(this.props.linkArray);

    return (
      <div className={styles.hdr}>
        <img src='/ext/img/logo/v2/logo-color.svg' className={styles['logo-container']} onClick={this.clickAndReturnHome}/>
        <div className={styles['title-container']}>
          <LocaleSelector type={LocaleSelectorTypes.Link}/>
        </div>
        <div className={styles['icon-container']}>
          {generatedIcons}
        </div>
      </div>
      );
  }
}
