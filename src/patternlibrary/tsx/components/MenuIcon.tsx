`use strict`

import * as React from "react";

import '../../scss/base.scss';
var styles = require('../../scss/components/MenuIcon.scss');

export interface MenuIconProp {
  icon: string;
  title: string;
  path: string;
  unlinkable?: boolean;
}

export class MenuIcon extends React.PureComponent<MenuIconProp, {}> {
  constructor(props:any) {
    super(props);
  };

  _clickAndChangeLocation = (path:string) => {
    const {unlinkable} = this.props;
    if(!unlinkable) {
      window.location.href = path;
    }
  };

  render() {
    const {title, icon, path, unlinkable} = this.props;

    return (
      <div className={styles['menu-icon'] + (unlinkable ? ' ' + styles['unlinkable'] : '')} onClick={()=>this._clickAndChangeLocation(path)}>
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
