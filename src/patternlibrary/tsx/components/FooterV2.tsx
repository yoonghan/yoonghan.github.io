`use strict`

import * as React from "react";
import * as CSSTransition from 'react-transition-group/CSSTransition';
import {MenuIcon} from './MenuIcon';

import '../../scss/base';
var styles = require('../../scss/components/FooterV2');

interface ContactOpenState {
  isContactOpen: boolean;
}

interface ILinks {
  text: string;
  path: string;
}

interface ContactOpenProps {
  contactInformation: string;
}

export interface FooterProps {
  updatedYear: number;
  contactInformation: string;
  linkArray: Array<ILinks>;
  isHomepage?: boolean;
}

export class FooterV2 extends React.Component<FooterProps, {}> {
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
           <a href={path} key={text}>&bull; {text}</a>
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
            2016 - {updatedYear} Walcron Coorperation &copy;
          </div>
        </div>
      </div>
      );
  }
}

class ContactDisplay extends React.Component<ContactOpenProps, ContactOpenState> {
  constructor(props:any) {
    super(props);

    const openState = false;

    this.state = {
      isContactOpen: openState
    };
  }

  _generateContactOpen = () => {
    return (
      <div className={styles['ftr-contact-close-container']}>
        <div className={styles['ftr-contact-email-content']}>
          <div className={styles['ftr-contact-close-deco']}>
            <a href="javascript:;" className={styles['ftr-contact-close-btn'] + ' links'} onClick={this._clickContact}>
              <i className={"fa fa-remove"}></i>
            </a>
          </div>
          <div className={styles['ftr-contact-email-information']}>
            {this.props.contactInformation}
          </div>
          <div className={styles['ftr-contact-email-contact']}>
            <a href="mailto:walcoorperation@gmail.com">
              <i className="fa fa-envelope-open"></i>
            </a>
            <a href="https://github.com/yoonghan" target="contact">
              <i className="fa fa-github"></i>
            </a>
            <a href="https://www.facebook.com/walcron.coorperation" target="contact">
              <i className="fa fa-facebook-official"></i>
            </a>
          </div>
        </div>
      </div>
    );
  }

  _generateNonContactOpen = () => {
    return (
      <div className={styles['ftr-contact-open-deco']}>
        <a href="javascript:;" className={styles['ftr-contact-open-btn'] + ' links'} onClick={this._clickContact}>
          <span>
            <i className={'fa fa-pencil-square-o'}></i>
            <span>
              Contact Us
            </span>
          </span>
        </a>
      </div>
    );
  }

  _clickContact = () => {

    window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);

    this.setState(
      (prevState, props) => {
        return {
          isContactOpen: !prevState.isContactOpen
        };
      }
    );
  }

  render() {
    const {isContactOpen} = this.state;
    const generatedContactOpen = this._generateContactOpen(),
      generatedNonContactOpen = this._generateNonContactOpen();

    return (
      <div className={styles['ftr-contact']}>
        <CSSTransition
          in = {isContactOpen}
          classNames={{
            enter: styles['footercontactemail-enter'],
            enterActive: styles['footercontactemail-enter-active'],
            exit: styles['footercontactemail-leave'],
            exitActive: styles['footercontactemail-leave-active']
          }}
          timeout={{
            enter: 500,
            exit: 500
          }}>
            <div>{isContactOpen && generatedContactOpen}</div>
        </CSSTransition>
        {!isContactOpen && generatedNonContactOpen}
      </div>
    );
  }
}
