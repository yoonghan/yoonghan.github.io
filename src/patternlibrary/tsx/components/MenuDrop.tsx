`use strict`

import * as React from "react";
import { UtilLocale } from "../util/UtilLocale";
import { LocaleSelector, LocaleSelectorTypes } from "./LocaleSelector";
import * as CSSTransition from 'react-transition-group/CSSTransition';

import '../../scss/base';
var styles = require('../../scss/components/MenuDrop');
declare function require(path: string): any;

export interface MenuDropListing {
  location: string;
  label: string;
  icon?: string;
}

export interface MenuDropProps {
  mobileOpensOnLoad?: Boolean;
  listing: Array<MenuDropListing>;
}

interface MenuDropState {
  isMenuOpened: boolean;
  menuIcon: string;
}

interface MobileMenuProps {
  listing: Array<MenuDropListing>;
  closeHandler: ()=>void;
  ignorableRefNode: HTMLElement;
}

/**
 * Created only for menu listing.
 */
export class MenuDrop extends React.Component<MenuDropProps, MenuDropState> {
  private clickRef:HTMLElement;

  constructor(props:any) {
    super(props);
    this.state = {
      isMenuOpened: false,
      menuIcon: this.toggleIcon(false)
    };
  }

  handleMenuClick = () => {
    const self = this;
    this.setState(
      (prevState, props) => {
        const inverseMenuState = !prevState.isMenuOpened;
        return {
          isMenuOpened: inverseMenuState,
          menuIcon: self.toggleIcon(inverseMenuState)
        };
      }
    );
  }

  toggleIcon = (state:boolean):string => {
    return (state ? 'ellipsis-v' : 'ellipsis-v' )
  }

  componentDidMount() {
    if(!this.props.mobileOpensOnLoad) {
      this.clickRef.click();
    }
  }

  createMenu = ():JSX.Element[] => {
    const mnuListing = this.props.listing;
    return mnuListing.map(function(mnuItem) {
      const key= 'mnu' + mnuItem.label;
      const icon = mnuItem.icon ? 'fa fa-' + mnuItem.icon:'';

      return (
        <a className={'links ' + styles['mnudrop-lst-big']} href={UtilLocale.getLocalizedHref(mnuItem.location)} key={key}>
          <i className={icon}></i> {mnuItem.label}
        </a>
        );
    });
  }

  render() {
    const listOfMenus = this.createMenu();

    return (
      <div className={styles.mnudrop}>
        <div className={styles['mnudrop-lst']}>
          {listOfMenus}
          <h5>[ <LocaleSelector type={LocaleSelectorTypes.Link} />]</h5>
          <a className={'links ' + styles['mnudrop-lst-small']}
            onClick={this.handleMenuClick} ref={node => this.clickRef = node}>
            <i className={'fa fa-lg fa-' + this.state.menuIcon}></i>
          </a>
        </div>
        <CSSTransition
          in = {
            !this.state.isMenuOpened
          }
          classNames={{
            enter: styles['mnudropmobile-enter'],
            enterActive: styles['mnudropmobile-enter-active'],
            exit: styles['mnudropmobile-leave'],
            exitActive: styles['mnudropmobile-leave-active']
          }}
          timeout={{
            enter: 200,
            exit: 200,
          }}>
          <div>
            {!this.state.isMenuOpened && <MobileMenu listing={this.props.listing} closeHandler={this.handleMenuClick} ignorableRefNode={this.clickRef}/>}
          </div>
        </CSSTransition>
      </div>
    );
  }
};

class MobileMenu extends React.Component<MobileMenuProps, {}> {
  private node:HTMLElement;

  constructor(props:any) {
    super(props);
  }

  handleClick = (e:Event) => {
    const target:HTMLElement = e.target as HTMLElement,
      {ignorableRefNode, closeHandler} = this.props;

    if(!this.node.contains(target) && (ignorableRefNode && !ignorableRefNode.contains(target))) {
      closeHandler();
    }
  }

  componentWillMount() {
    document.addEventListener('click', this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClick, false);
  }

  createMobileListing = ():JSX.Element[] => {
    const mnuListing = this.props.listing;

    return mnuListing.map(function(mnuItem) {
      const key= 'mnu-mob' + mnuItem.label;
      const icon = mnuItem.icon ? 'fa fa-' + mnuItem.icon:'';
      return (
        <li key={key}>
          <a className={'links ' + styles['mnudrop-lst-big']} href={UtilLocale.getLocalizedHref(mnuItem.location)}>
            <i className={icon}></i> {mnuItem.label}
          </a>
        </li>
        );
    });
  };

  render() {
    const listOfMobMenus = this.createMobileListing();
    return (
      <div className={styles['mnudrop-mob']} ref={node => this.node = node}>
        <ul>
          {listOfMobMenus}
        </ul>
      </div>
    );
  }
};
