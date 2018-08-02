`use strict`

import * as React from "react";
import * as CSSTransition from 'react-transition-group/CSSTransition';

import '../../../scss/base.scss';
var styles = require('../../../scss/components/FooterV2.scss');

interface ContactOpenState {
  isContactOpen: boolean;
}

interface ContactOpenProps {
  contactInformation: string;
}

export class ContactDisplay extends React.PureComponent<ContactOpenProps, ContactOpenState> {
  constructor(props:any) {
    super(props);

    const openState = true;

    this.state = {
      isContactOpen: openState
    };
  }

  _generateContactOpen = () => {
    return (
      <div className={styles['ftr-contact-close-container']}>
        <div className={styles['ftr-contact-email-content']}>
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
            <a href="https://www.stackoverflow.com/users/3893990/han" target="contact">
              <i className="fa fa-stack-overflow"></i>
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
