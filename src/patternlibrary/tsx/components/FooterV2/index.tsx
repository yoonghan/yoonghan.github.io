`use strict`

import * as React from "react";
import * as CSSTransition from 'react-transition-group/CSSTransition';
import {MenuIcon} from '../MenuIcon';
import {ContactDisplay} from './ContactDisplay';

import '../../../scss/base.scss';
var styles = require('../../../scss/components/FooterV2.scss');

interface ILinks {
  text: string;
  path: string;
}

export interface FooterProps {
  updatedYear: number;
  contactInformation: string;
  linkArray: Array<ILinks>;
  isHomepage?: boolean;
}

export class FooterV2 extends React.PureComponent<FooterProps, {}> {
  constructor(props:any) {
    super(props);
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

  _generateLinks = (links:Array<ILinks>) => {
    const linkAsHtml = links.map(
      (linkItem) => {
        const {text, path} =  linkItem;

        if(this._isOwnPage(path)) {
          return;
        }

        return (
           <span>&bull; <a href={path} key={text}>{text}</a></span>
        );
      }
    );

    if(!this.props.isHomepage) {
      linkAsHtml.unshift(<a href="/" className={styles['ftr-back-arrow']}><i className={"fa fa-arrow-circle-left"}></i></a>);
    }

    return linkAsHtml;
  };

  render() {
    const {updatedYear, linkArray, contactInformation} = this.props;
    const generatedLinks = this._generateLinks(linkArray);

    return (
      <div className={styles.ftr}>
        <div className={styles['ftr-container']}>
          <div className={styles['ftr-section-one']}>
            <ContactDisplay contactInformation={contactInformation}/>
          </div>
          <div className={styles['ftr-divider']}></div>
          <div className={styles['ftr-links']}>
            {generatedLinks}
          </div>
          <div className={styles['ftr-divider']}></div>
          <div className={styles['ftr-footnote']}>
            2014 - {updatedYear} Walcron Coorperation &copy;
          </div>
        </div>
      </div>
      );
  }
}
