`use strict`

import * as React from "react";

import '../../scss/base';
var styles = require('../../scss/components/MenuIcon');

export interface MenuIconProp {
  icon: string;
  title: string;
}

export class MenuIcon extends React.Component<MenuIconProp, {}> {
  constructor(props:any) {
    super(props);
  }

  render() {
    const {title, icon} = this.props;

    return (
      <div className={styles['menu-icon']}>
        <div className={styles['icon']}>
          <div className={styles['image']}><i className={"fa fa-" + icon} aria-hidden="true"></i></div>
          <div className={styles['icon-inner']}/>
        </div>
        <div className={styles['title']}>
          {title}
        </div>
      </div>
      );
  }
}
