`use strict`

import * as React from "react";

import '../../scss/base';
var styles = require('../../scss/components/MenuIcon');

export interface MenuIconProp {
  icon: string;
  title: string;
  path: string;
}

export class MenuIcon extends React.Component<MenuIconProp, {}> {
  constructor(props:any) {
    super(props);
  };

  clickAndChangeLocation = (path:string) => {
    window.location.href = path;
  };

  render() {
    const {title, icon, path} = this.props;

    return (
      <div className={styles['menu-icon']} onClick={()=>this.clickAndChangeLocation(path)}>
        <div className={styles['icon']}>
          <div className={styles['image']}><i className={"fa fa-" + icon} aria-hidden="true"></i></div>
          <div className={styles['icon-inner']}/>
        </div>
        <div className={styles['title']}>
          {title}
        </div>
      </div>
      );
  };
}
