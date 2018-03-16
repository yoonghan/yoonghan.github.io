`use strict`

import * as React from "react";
import {Button} from 'react-toolbox/lib/button';

import '../../scss/base.scss';
var styles = require('../../scss/components/ProgressiveButton.scss');
declare function require(path: string): any;

interface ProgressiveButtonState {
  initialized: boolean;
  buttonColor: string;
  buttonText: string;
  buttonDisabled: boolean;
}

interface ProgressiveButtonProps {
  ready: string;
  notsupported: string;
  installing: string;
  installed: string;
  alreadyInstalled: string;
  updating: string;
  failed: string;
  successfulCallback?: any;
}

export class ProgressiveButton extends React.PureComponent<ProgressiveButtonProps, ProgressiveButtonState> {
  private isServiceWorkerAvailable = false;

  constructor(props:any) {
    super(props);
    this.isServiceWorkerAvailable = ('serviceWorker' in navigator);
    this.state = {
      initialized: false,
      buttonColor: '',
      buttonText: (this.isServiceWorkerAvailable ? this.props.ready : this.props.notsupported),
      buttonDisabled: !this.isServiceWorkerAvailable
    };
  }

  updateState = (buttonText:string, buttonColor:string, success = false, buttonDisabled = this.state.initialized, initialized = this.state.initialized) => {
    this.setState(
      (prevState, props) => {
        return {
          initialized: initialized,
          buttonColor: buttonColor,
          buttonText: buttonText,
          buttonDisabled: buttonDisabled
        };
      }
    );

    if(success) {
      if(this.props.successfulCallback) {
        this.props.successfulCallback();
      }
    }
  }

  handleInstallation = () => {
    const updateState = this.updateState;
    const {failed, installed, updating, alreadyInstalled} = this.props;
    if(!this.isServiceWorkerAvailable || this.state.initialized) {
      return;
    }

    updateState(this.props.installing, '', false, true, true);

    navigator.serviceWorker.register('/service-worker.js').then(function(reg:ServiceWorkerRegistration) {
      let active = reg.active;
      if(active) {
        updateState (alreadyInstalled, styles['success'], true, false);
        return;
      }

      reg.onupdatefound = function() {
        var installingWorker = reg.installing;
        installingWorker.onstatechange = function() {
          switch (installingWorker.state) {
            case 'installed':
              if (navigator.serviceWorker.controller) {
                updateState (installed, styles['success'], true, false);
              } else {
                updateState (installed, styles['success'], true, false);
              }
              break;
            case 'redundant':
              updateState (failed, styles['error'], false, false);
              break;
          }
        };
      };
    }).catch(function(e:string) {
      updateState (failed, styles['error'], false, false, false);
    });
  }

  render() {
    const {buttonText, buttonColor, buttonDisabled} = this.state;
    return (
      <div className={styles.progressive}>
        <Button label={buttonText} theme={styles} className={buttonColor} raised primary disabled={buttonDisabled} onClick={this.handleInstallation}/>
      </div>
    )
  }
}
