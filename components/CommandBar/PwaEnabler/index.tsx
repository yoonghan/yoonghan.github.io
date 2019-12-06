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
}

interface PwaEnablerProps {
  cancelCallback: () => void;
}

class PwaEnabler extends React.Component<PwaEnablerProps, PwaEnablerState> {
  private dialogContainerRef = React.createRef<HTMLDivElement>();
  private DISABLED = "  Disabled"; //count text.
  private ENABLED = "Registered";

  constructor(props:any) {
    super(props);
    this.state = {
      enabled: false,
      labelText: this.DISABLED
    };
  }

  componentDidUpdate() {
    const {enabled} = this.state;
    if(enabled) {
      register();
    }
    else {
      unregister();
    }
  }

  onChangeEnabler = () => {
    this.setState(
      produce((draft: Draft<PwaEnablerState>) => {
        draft.enabled = !draft.enabled;
        draft.labelText = draft.enabled? this.ENABLED:this.DISABLED;
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
                defaultChecked={this.state.enabled}
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
