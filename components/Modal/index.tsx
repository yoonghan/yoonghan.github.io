`use strict`

/**
  Displaying the dialog for help
  **/

import * as React from "react";
import {ESC} from "../../shared/keyboardkey";
import {DIALOG} from "../../shared/style";

interface ModalProps {
  ignoreSelfClose?: boolean;
  cancelCallback: (event?: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

class Modal extends React.PureComponent<ModalProps, {}> {
  private dialogContainerRef = React.createRef<HTMLDivElement>();
  private escRef = React.createRef<HTMLButtonElement>();
  private keyListenerEvent: (evt: KeyboardEvent) => void;
  private documentBody = document.getElementsByTagName("body")[0];

  constructor(props:ModalProps) {
    super(props);
    const _cancelCallback = props.cancelCallback;
    this.keyListenerEvent = function (evt: KeyboardEvent) {
      if ( (evt.keyCode as any) === ESC )   {
         _cancelCallback();
      }
    };
  }

  componentDidMount() {
    if(this.escRef.current !== null) {
      this.escRef.current.focus();
    }
    this.documentBody.addEventListener('keyup', this.keyListenerEvent);
  }

  componentWillUnmount() {
    this.documentBody.removeEventListener('keyup', this.keyListenerEvent);
  }

  _onClickContainer = (event: React.MouseEvent<HTMLElement>) => {
    const {ignoreSelfClose, cancelCallback} = this.props;
    if(ignoreSelfClose) {
      if(event && this.dialogContainerRef && event.target === this.dialogContainerRef.current) {
        cancelCallback(event);
      }
    }
    else {
      cancelCallback(event);
    }
  }

  render() {
    return (
      <div className={"modal"} onClick={this._onClickContainer} ref={this.dialogContainerRef}>
        <div className={"modal-content"}>
          {this.props.children}
        </div>
        <div className={"buttonContainer"} onClick={this.props.cancelCallback}>
          <button ref={this.escRef}>[ESC]</button>
        </div>
        <style jsx> {`
          button {
            color: ${DIALOG.FOREGROUND};
            background: transparent;
            border: none;
          }
          .buttonContainer {
            text-align: right;
          }
          .modal {
            position: fixed;
            z-index: 99;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            overflow: auto;
            background-color: rgba(100,100,100,0.8);
            cursor: pointer;
          }
          .modal-content {
            position: fixed;
            z-index: 100;
            animation-name: slideIn;
            animation-duration: 0.4s;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            min-width: 320px;
          }
        `}</style>
      </div>
    );
  }
}

export default Modal;
