`use strict`

import * as React from "react";

import { MenuDrop, MenuDropListing, MenuDropProps } from "./MenuDrop";
import { UtilLocale } from "../util/UtilLocale";
import '../../scss/base.scss';

var styles = require('../../scss/components/Header.scss');
declare function require(path: string): any;

export interface HeaderProp {
  headerTitle: string;
  isHomepage?: Boolean;
  mobileOpensOnLoad?: Boolean;
  menus: Array<MenuDropListing>;
}

export class Header extends React.Component<HeaderProp, {}> {

  constructor(props:any) {
    super(props);
  }

  render() {
    const mnuDropListing:Array<MenuDropListing> = this.props.menus;
    const {headerTitle, isHomepage} = this.props;
    return (
      <div className={styles.hdr}>
        <div className={styles['hdr-div']}>
          <h4 className={styles['hdr-remark']}>
            "{headerTitle}"
          </h4>
          <MenuDrop listing={mnuDropListing} mobileOpensOnLoad={this.props.mobileOpensOnLoad}/>
          <div className={styles['hdr-logo']}>
            <a href={UtilLocale.getLocalizedHref('/')}>
              {isHomepage && <img src='/ext/img/logo/logoOnlyWhiteBg.svg' />}
              {!isHomepage && <img src='/ext/img/logo/logoAsBackButton.svg' />}
            </a>
          </div>
        </div>
      </div>
    );
  }
}
