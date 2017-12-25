`use strict`

import * as React from "react";
import { LocaleSelector, LocaleSelectorTypes } from "./LocaleSelector";
import { UtilLocale } from "../util/UtilLocale";
import * as CSSTransition from 'react-transition-group/CSSTransition';

import '../../scss/base';
var styles = require('../../scss/components/Footer');
declare function require(path: string): any;

interface ContactOpenState {
  isContactOpen: boolean;
  contactIcon: string;
}

export interface LinksItem {
  link: string;
  label: string;
}

export interface FooterProps {
  links: Array<LinksItem>;
  updatedYear: number;
  emailLabel: string;
  emailTitle: string;
  emailAddress: string;
  emailMsg: string;
}

export class Footer extends React.Component<FooterProps, ContactOpenState> {

  private node: HTMLElement;

  constructor(props:any) {
    super(props);

    const openState = false;

    this.state = {
      isContactOpen: openState,
      contactIcon: this.displayContactIcon(openState)
    };
  };

  clickContact = () => {
    const isContactOpen = !this.state.isContactOpen,
          self = this;

    this.setState(
      (prevState, props) => {
        return {
          isContactOpen: isContactOpen,
          contactIcon: self.displayContactIcon(isContactOpen)
        };
      }
    );
  };

  componentDidUpdate() {
    if(this.state.isContactOpen) {
      const scrollDuration = 500;
      const self = this.node;
      const pos = self.getBoundingClientRect().height;

      if(pos > 0) {
        var scrollHeight = pos;
        const scrollStep = Math.PI / ( scrollDuration / 15 ),
            cosParameter = scrollHeight / 2;
        var scrollCount = 0,
            scrollMargin,
            scrollInterval = setInterval( function() {
              if ( scrollHeight > 0 ) {
                  scrollCount = scrollCount + 1;
                  scrollMargin = cosParameter - cosParameter * Math.cos( scrollCount * scrollStep );
                  window.scrollTo( 0, ( window.scrollY + scrollMargin ) );
                  scrollHeight -= scrollMargin;
              }
              else clearInterval(scrollInterval);
            }, 15 );
      }
    }
  };

  displayContactIcon = (isShown:boolean):string => {
    return (isShown ? 'remove' : 'phone');
  };

  loadContactInfo = () => {
    const {emailAddress, emailTitle, emailMsg} = this.props;

    return (
      <div ref={node => this.node = node} className={styles['footer-contact']}>
        <h4>{emailTitle}</h4>
        <div>
          <a href={'mailto:' + emailAddress}>
            <i className='fa fa-pencil-square-o'></i> {emailAddress}
          </a>
        </div>
        <div>{emailMsg}</div>
      </div>
    );
  }

  render() {
    const {links, updatedYear, emailLabel} = this.props;

    const linkList = links.map(function(item) {
      const {link, label} = item;
      return (
        <a href={UtilLocale.getLocalizedHref(link)} key={label}>{label}</a>
      );
    });

    return (
      <div className={styles.footer + ' links-white-background'}>
        <div className={styles['footer-divider']}/>
        <div className={styles['footer-container']}>
          <div className={styles['footer-section-one']}>
            <a href={UtilLocale.getLocalizedHref('/')}>
              <img src="/ext/img/logo/logoOnWhiteBg.svg"/>
            </a>
            <div>
              <LocaleSelector type={LocaleSelectorTypes.Dropdown}/>
            </div>
            <div className={styles['footer-section-one-link']}>
              <a href="javascript:;" onClick={this.clickContact} className='links'>
                <i className={'fa fa-' + this.state.contactIcon}></i>
                {!this.state.isContactOpen && emailLabel}
              </a>
            </div>
          </div>
          <CSSTransition
            in = {
              this.state.isContactOpen
            }
            classNames={{
              enter: styles['footercontactemail-enter'],
              enterActive: styles['footercontactemail-enter-active'],
              exit: styles['footercontactemail-leave'],
              exitActive: styles['footercontactemail-leave-active']
            }}
            timeout={{
              enter: 300,
              exit: 300
            }}>
            <div>
              {this.state.isContactOpen && this.loadContactInfo()}
            </div>
          </CSSTransition>
          <hr/>
          <div className={styles['footer-section-two'] + ' links-white-background'}>
            {linkList}
          </div>
          <div className={styles['footer-section-three'] + ' base-footnote'}>
            2016-{updatedYear} Walcron Coorperation &copy; 
          </div>
        </div>
      </div>
    );
  }
}
