`use strict`

import * as React from "react";
import produce, {Draft} from "immer";
import Toggle from 'react-toggle';
import Modal from "../../Modal";
import { register, unregister } from 'next-offline/runtime';
import {DIALOG, SHADOW} from "../../../shared/style";

interface PwaEnablerState {
  enabled: boolean;
  labelText: string;
  processing: boolean;
}

interface PwaEnablerProps {
  cancelCallback: () => void;
}

class PwaEnabler extends React.Component<PwaEnablerProps, PwaEnablerState> {
  private dialogContainerRef = React.createRef<HTMLDivElement>();
  private DISABLED = "  Disabled"; //count text.
  private ENABLED = " Installed";
  private PROCESS = "Processing";

  constructor(props:any) {
    super(props);
    this.state = {
      enabled: false,
      labelText: this.DISABLED,
      processing: true
    };
  }

  getRegistration = () => {
    const domain = window.location.hostname;
    if(navigator && navigator.serviceWorker) {
      return navigator.serviceWorker.getRegistration(domain);
    }
    else {
      return new Promise((resolve) => {
        resolve(false);
      });
    }
  }

  _checkRegistration = async () => {
    const isRegistered = await this.getRegistration();
    const isEnabled = (isRegistered && (isRegistered as any).scope) ? true: false;
    this.setState(
      produce((draft: Draft<PwaEnablerState>) => {
        draft.processing = false;
        draft.enabled = isEnabled;
        draft.labelText = isEnabled? this.ENABLED:this.DISABLED;
      })
    );
  }

  componentDidMount() {
    this._checkRegistration();
  }

  componentDidUpdate() {
    const {enabled, processing} = this.state;
    if(processing){
      if(enabled) {
        register();
      }
      else {
        unregister();
      }
      //Check installation after 3 seconds as unregister/register are not promises.
      setTimeout(this._checkRegistration, 5000);
    }
  }

  onChangeEnabler = () => {
    this.setState(
      produce((draft: Draft<PwaEnablerState>) => {
        draft.processing = true;
        draft.enabled = !draft.enabled;
        draft.labelText = this.PROCESS;
      })
    );
  }

  render() {
    return (
      <Modal cancelCallback={this.props.cancelCallback} ignoreSelfClose={true}>
        <div className={"container"}
          ref={this.dialogContainerRef}>
          <h4>Progressive Web App</h4>
          <div>
            Enable webpage to be browsed in even when offline.
            As of December 2019 this feature only works on <strong>Chrome and Mozilla</strong> browsers.
          </div>

          <div className={"toggle-container"}>
            <label>
              <Toggle
                id="toggle-pwa"
                disabled={this.state.processing}
                checked={this.state.enabled}
                defaultChecked={false}
                onChange={this.onChangeEnabler} />
              <span className={"label-text"}>{this.state.labelText}</span>
            </label>
          </div>
          <style jsx>
          {`
            .container {
              padding: 10px 10px 2rem 10px;
              color: ${DIALOG.BACKGROUND};
              background: ${DIALOG.FOREGROUND};
              box-shadow: 5px 5px 2px ${SHADOW};
            }
            .toggle-container {
              text-align: center;
              margin-top: 2rem;
            }
            .label-text {
              margin-left: 1rem;
              vertical-align: middle;
              font-weight: normal;
              margin-bottom: 0;
            }
          `}
          </style>
        </div>
      </Modal>
    )
  }
}

export default (PwaEnabler);
