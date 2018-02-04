`use strict`

import * as React from "react";
import { UtilLocale } from "../util/UtilLocale";
import { MenuIcon } from "./MenuIcon";
import * as CSSTransition from 'react-transition-group/CSSTransition';

import '../../scss/base';
var styles = require('../../scss/components/MenuDropV2');
declare function require(path: string): any;

export interface ILinks {
  path: string;
  title: string;
  icon?: string;
}

export interface MenuDropV2Props {
  mobileOpensOnLoad?: Boolean;
  isHomepage?: Boolean;
  linkArray: Array<ILinks>;
}

interface MenuDropV2State {
  isMenuOpened: boolean;
  menuIcon: string;
}

interface MobileMenuV2Props {
  linkArray: Array<ILinks>;
  isOwnPage: (pathToCheck:string)=>Boolean;
  closeHandler: ()=>void;
  isHomepage?: Boolean;
  ignorableRefNode: HTMLElement;
}

/**
 * Created only for menu array.
 */
export class MenuDropV2 extends React.Component<MenuDropV2Props, MenuDropV2State> {
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
        document.body.style.overflow = inverseMenuState ? "hidden":"auto";
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
    if(this.props.mobileOpensOnLoad) {
      this.clickRef.click();
    }
  }

  _isOwnPage = (pathToCheck:string) => {
    const pathName = location.pathname;
    if(pathName.indexOf('/') === -1 || pathToCheck === '/') {
      return;
    }

    const currentPageIdx = pathName.lastIndexOf('/'),
      path = pathName.substring(currentPageIdx);

    return path.indexOf(pathToCheck) === 0;
  }

  generateIcons = (links:Array<ILinks>) => {
    const {isHomepage} = this.props;

    const linkAsHtml = links.map(
      (linkItem) => {
        const {title, path, icon} =  linkItem;

        if(path==='/' && isHomepage) {
          return;
        }

        if(this._isOwnPage(path)) {
          return;
        }

        return (
          <MenuIcon icon={icon} title={title} key={title} path={path}/>
        );
      }
    );
    return linkAsHtml
  };

  render() {
    const generatedIcons = this.generateIcons(this.props.linkArray);
    const classNameForFullScreen = this.state.isMenuOpened? styles['mnudrp-fullscreen']:'';

    return (
      <div className={styles.mnudrp + ' ' + classNameForFullScreen}>
        <div className={styles['mnudrp-container']}>
          <div className={styles['mnudrp-desktop-deco']}>
            {generatedIcons}
          </div>
          <div className={styles['mnudrp-mobile-btn'] + ' ' + styles['mnudrp-btn-deco']}>
            <a className={styles['mnudrp-btn']}
              onClick={this.handleMenuClick} ref={node => this.clickRef = node}>
              <i className={'fa fa-lg fa-' + this.state.menuIcon}></i>
            </a>
          </div>
        </div>
        <CSSTransition
          in = {
            this.state.isMenuOpened
          }
          classNames={{
            enter: styles['mnudrpmobile-enter'],
            enterActive: styles['mnudrpmobile-enter-active'],
            exit: styles['mnudrpmobile-leave'],
            exitActive: styles['mnudrpmobile-leave-active']
          }}
          timeout={{
            enter: 200,
            exit: 200,
          }}>
          <div>
            {this.state.isMenuOpened &&
              <MobileMenuV2 linkArray={this.props.linkArray}
              closeHandler={this.handleMenuClick}
              ignorableRefNode={this.clickRef}
              isHomepage={this.props.isHomepage}
              isOwnPage={this._isOwnPage}
              />
            }
          </div>
        </CSSTransition>
      </div>
    );
  }
};

class MobileMenuV2 extends React.Component<MobileMenuV2Props, {}> {
  private node:HTMLElement;

  constructor(props:any) {
    super(props);
  }

  _handleClick = (e:Event) => {
    const target:HTMLElement = e.target as HTMLElement,
      {ignorableRefNode, closeHandler} = this.props;

    if(!this.node.contains(target) && (ignorableRefNode && !ignorableRefNode.contains(target))) {
      closeHandler();
    }
  }

  componentWillMount() {
    document.addEventListener('click', this._handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this._handleClick, false);
  }

  generateMobileListing = ():JSX.Element[] => {
    const {linkArray, isHomepage, isOwnPage} = this.props;

    return linkArray.map(function(mnuItem) {
      const key= 'mnu-mob' + mnuItem.title;
      const icon = mnuItem.icon ? 'fa fa-' + mnuItem.icon:'';

      if(mnuItem.path==='/' && isHomepage) {
        return;
      }

      if(isOwnPage(mnuItem.path)) {
        return;
      }

      return (
        <li key={key}>
          <a className={'links ' + styles['mnudrop-lst-big']} href={UtilLocale.getLocalizedHref(mnuItem.path)}>
            {mnuItem.title}
          </a>
        </li>
        );
    });
  };

  render() {
    const generatedMobileListing = this.generateMobileListing();
    return (
      <div className={styles['mnudrp-mob-container']}>
        <div className={styles['mnudrp-mob-background']}/>
        <div className={styles['mnudrp-mob-bar']}  ref={node => this.node = node}>
          <div className={styles['mnudrop-mob-close']}>
            <div className={styles['mnudrp-btn-deco']}>
              <a href='#' onClick={this.props.closeHandler} className={styles['mnudrp-btn']}>
                <i className={'fa fa-close'}></i>
              </a>
            </div>
          </div>
          <ul>
            {generatedMobileListing}
          </ul>
        </div>
      </div>
    );
  }
};
