`use strict`

import * as React from "react";
import * as ReactCSSTransitionGroup from "react-addons-css-transition-group";

import '../../css/base.scss';
var styles = require('../../css/components/MenuDrop');
declare function require(path: string): any;

export interface MenuDropListing {
  location: string;
  label: string;
  icon?: string;
}

export interface MenuDropProps {
  listing: Array<MenuDropListing>
}

interface MenuDropState {
  isMenuOpened: boolean;
  menuIcon: string;
}

/**
 * Created only for menu listing.
 */
export class MenuDrop extends React.Component<MenuDropProps, MenuDropState> {

  constructor(props:any) {
    super(props);
    this.state = {
      isMenuOpened: false,
      menuIcon: this.toggleIcon(false)
    };
  }

  handleMenuClick = () => {
    const inverseMenuState = !this.state.isMenuOpened;
    this.setState({
      isMenuOpened: inverseMenuState,
      menuIcon: this.toggleIcon(inverseMenuState)
    });
  }

  toggleIcon = (state:boolean):string => {
    return (state ? 'toggle-down' : 'list' )
  }

  createMenu = ():JSX.Element[] => {
    const mnuListing = this.props.listing;
    return mnuListing.map(function(mnuItem) {
      const key= 'mnu' + mnuItem.label;
      const icon = mnuItem.icon ? 'fa fa-' + mnuItem.icon:'';

      return (
        <a className={'links ' + styles['mnudrop-lst-big']} href={mnuItem.location} key={key}>
          <i className={icon}></i> {mnuItem.label}
        </a>
        );
    });
  }

  createMobileListing = ():JSX.Element[] => {
    const mnuListing = this.props.listing;

    return mnuListing.map(function(mnuItem) {
      const key= 'mnu-mob' + mnuItem.label;
      const icon = mnuItem.icon ? 'fa fa-' + mnuItem.icon:'';
      return (
        <li key={key}>
          <a className={'links ' + styles['mnudrop-lst-big']} href={mnuItem.location}>
            <i className={icon}></i> {mnuItem.label}
          </a>
        </li>
        );
    });
  }

  createMobileMenu = ():JSX.Element => {
    const listOfMobMenus = this.createMobileListing();
    return (
        <div className={styles['mnudrop-mob']}>
          <ul>
            {listOfMobMenus}
          </ul>
        </div>
    );
  }

  render() {
    const listOfMenus = this.createMenu();
    const listOfMobMenus = this.createMobileMenu();

    return (
      <div className={styles.mnudrop}>
        <div className={styles['mnudrop-lst']}>
          {listOfMenus}
          <a className={'links ' + styles['mnudrop-lst-small']}
          onClick={this.handleMenuClick}>
            <i className={'fa fa-lg fa-' + this.state.menuIcon}></i>
          </a>
        </div>
        <ReactCSSTransitionGroup
          transitionName={ {
            enter: styles['mnudropmobile-enter'],
            enterActive: styles['mnudropmobile-enter-active'],
            leave: styles['mnudropmobile-leave'],
            leaveActive: styles['mnudropmobile-leave-active']
          } }
          transitionEnterTimeout = {200}
          transitionLeaveTimeout = {200}>
          {this.state.isMenuOpened && listOfMobMenus}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}
