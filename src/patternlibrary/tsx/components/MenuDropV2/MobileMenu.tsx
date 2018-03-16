`use strict`

import * as React from "react";
import { UtilLocale } from "../../util/UtilLocale";

import '../../../scss/base.scss';
var styles = require('../../../scss/components/MenuDropV2.scss');
declare function require(path: string): any;

export interface ILinks {
  path: string;
  title: string;
  icon?: string;
}

interface MobileMenuProps {
  linkArray: Array<ILinks>;
  isOwnPage: (pathToCheck:string)=>Boolean;
  onClosed: ()=>void;
  closeHandler: ()=>void;
  isHomepage?: Boolean;
  ignorableRefNode: HTMLElement;
  transitionClassList: any;
}

export class MobileMenu extends React.PureComponent<MobileMenuProps, {}> {
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
