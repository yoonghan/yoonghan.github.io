`use strict`

import * as React from "react";
import { UtilLocale } from "../util/UtilLocale";
import { MenuIcon } from "./MenuIcon";
import {Transition} from 'react-transition-group';

import '../../scss/base.scss';
var styles = require('../../scss/components/MenuDropV2.scss');
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
  isFullScreen: boolean;
  menuIcon: string;
}

interface MobileMenuV2Props {
  linkArray: Array<ILinks>;
  isOwnPage: (pathToCheck:string)=>Boolean;
  onClosed: ()=>void;
  closeHandler: ()=>void;
  isHomepage?: Boolean;
  ignorableRefNode: HTMLElement;
  transitionClassList: any;
}

interface IAnimationClassList {
  entered: string;
  entering: string;
  exited: string;
  exiting: string;
  [key:string]: string;
}

/**
 * Created only for menu array.
 */
export class MenuDropV2 extends React.Component<MenuDropV2Props, MenuDropV2State> {
  private clickRef:HTMLElement;
  private animationClassList:IAnimationClassList = {
    entered: styles['mnudrpmobile-entered'],
    entering: styles['mnudrpmobile-entering'],
    exited: styles['mnudrpmobile-exited'],
    exiting: styles['mnudrpmobile-exiting']
  }

  constructor(props:any) {
    super(props);
    this.state = {
      isMenuOpened: false,
      menuIcon: this._toggleIcon(false),
      isFullScreen: false
    };
  }

  _handleMenuClick = () => {
    const self = this;
    this.setState(
      (prevState, props) => {
        const inverseMenuState = !prevState.isMenuOpened;
        document.body.style.overflow = inverseMenuState ? "hidden":"auto";
        return {
          isMenuOpened: inverseMenuState,
          menuIcon: self._toggleIcon(inverseMenuState),
          isFullScreen: true
        };
      }
    );
  }

  _toggleIcon = (state:boolean):string => {
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
      return false;
    }

    const currentPageIdx = pathName.lastIndexOf('/'),
      path = pathName.substring(currentPageIdx);

    return path.indexOf(pathToCheck) === 0;
  }

  _generateIcons = (links:Array<ILinks>) => {
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
    return linkAsHtml;
  };

  _disableFullscreen = () => {
    this.setState(
      (prevState, props) => {
        return {
          isMenuOpened: prevState.isMenuOpened,
          menuIcon: prevState.menuIcon,
          isFullScreen: false
        };
      }
    );
  }

  render() {
    const generatedIcons = this._generateIcons(this.props.linkArray);
    const classNameForFullScreen = this.state.isFullScreen? styles['mnudrp-fullscreen']:'';

    return (
      <div className={styles.mnudrp + ' ' + classNameForFullScreen}>
        <div className={styles['mnudrp-container']}>
          <div className={styles['mnudrp-desktop-deco']}>
            {generatedIcons}
          </div>
          <div className={styles['mnudrp-mobile-btn'] + ' ' + styles['mnudrp-btn-deco']}>
            <a className={styles['mnudrp-btn']}
              onClick={this._handleMenuClick}
              ref={node => this.clickRef = node}>
              <i className={'fa fa-lg fa-' + this.state.menuIcon}></i>
            </a>
          </div>
        </div>
        <Transition
          in = {
            this.state.isMenuOpened
          }
          appear = {
            this.state.isMenuOpened
          }
          timeout={200}>
          {
            (state:any) =>
            {
              if(state === 'exited') {
                return null;
              }

              return(
              <MobileMenuV2 linkArray={this.props.linkArray}
                onClosed={this._disableFullscreen}
                closeHandler={this._handleMenuClick}
                ignorableRefNode={this.clickRef}
                isHomepage={this.props.isHomepage}
                isOwnPage={this._isOwnPage}
                transitionClassList={this.animationClassList[state]}
              />)
            }
          }
        </Transition>
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
    this.props.onClosed();
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
      <div className={styles['mnudrp-mob-container'] + ' ' + this.props.transitionClassList}>
        <div className={styles['mnudrp-mob-background']}/>
        <div className={styles['mnudrp-mob-bar']} ref={node => this.node = node}>
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
