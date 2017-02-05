`use strict`

import * as React from "react";
import { LocaleSelector } from "./LocaleSelector";
import * as ReactCSSTransitionGroup from "react-addons-css-transition-group";

import '../../css/base';
var styles = require('../../css/components/Footer');
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
    const isContactOpen = !this.state.isContactOpen;
    this.setState({
      isContactOpen: isContactOpen,
      contactIcon: this.displayContactIcon(isContactOpen)
    });
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
        <a href={link} key={label}>{label}</a>
      );
    });

    return (
      <div className={styles.footer + ' links-white-background'}>
        <div className={styles['footer-divider']}/>
        <div className={styles['footer-container']}>
          <div className={styles['footer-section-one']}>
            <a href="/">
              <img src="/ext/img/logo/logoOnWhiteBg.svg"/>
            </a>
            <div>
              <LocaleSelector/>
            </div>
            <div className={styles['footer-section-one-link']}>
              <a href="javascript:;" onClick={this.clickContact} className='links'>
                <i className={'fa fa-' + this.state.contactIcon}></i>
                {!this.state.isContactOpen && emailLabel}
              </a>
            </div>
          </div>
          <ReactCSSTransitionGroup
            transitionName={ {
              enter: styles['footercontactemail-enter'],
              enterActive: styles['footercontactemail-enter-active'],
              leave: styles['footercontactemail-leave'],
              leaveActive: styles['footercontactemail-leave-active']
            } }
            transitionEnterTimeout={300}
            transitionLeaveTimeout={300}>
            {this.state.isContactOpen && this.loadContactInfo()}
          </ReactCSSTransitionGroup>
          <hr/>
          <div className={styles['footer-section-two'] + ' links-white-background'}>
            {linkList}
          </div>
          <div className={styles['footer-section-three'] + ' base-footnote'}>
            &copy; {updatedYear} Walcron Coorperation, Malaysia
          </div>
        </div>
      </div>
    );
  }
}
