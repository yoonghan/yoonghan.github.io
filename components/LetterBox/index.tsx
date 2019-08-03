`use strict`

import * as React from "react";
import Button from "../Button";
import produce, {Draft} from "immer";
import Modal from "../Modal";
import EmailSender from "./EmailSender";
import {LINK} from "../../shared/style";

export interface LetterBoxProps {
}

export interface LetterBoxStates {
  isDialogShow: boolean;
  name: string;
}

class LetterBox extends React.PureComponent<LetterBoxProps, LetterBoxStates> {

  constructor(props:LetterBoxProps) {
    super(props);
    this.state = {
      isDialogShow: false,
      name: ''
    }
  }

  _closeCallback = () => {
    this.setState(
      produce((draft: Draft<LetterBoxStates>) => {
        draft.isDialogShow = false;
        draft.name = "";
      })
    );
  }

  _onSubmitPressed = (event :React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this._onClickSendButton();
  }

  _onClickSendButton = () => {
    const {name} = this.state;
    if(!name || name.trim() === "") {
      return;
    }

    this.setState(
      produce((draft: Draft<LetterBoxStates>) => {
        draft.isDialogShow = true
      })
    );
  }

  _onChangeLetterBoxInput = (event :React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    this.setState(
      produce((draft: Draft<LetterBoxStates>) => {
        draft.name = input.trim();
      })
    );
  }

  render() {

    const {isDialogShow, name} = this.state;

    return (
      <div>
        If you are interested to talk to us, leave us your contact. Let us reach you instead.
        <form className={'letterbox-container'} onSubmit={this._onSubmitPressed}>
          <input
            type="text"
            autoComplete="off"
            className={"letterbox-input"}
            maxLength={400}
            placeholder={"Honorific and name"}
            onChange={this._onChangeLetterBoxInput}
            value={name}
            />
          <Button onClickCallback={this._onClickSendButton}>Send</Button>
          {
            isDialogShow && <Modal cancelCallback={this._closeCallback}><EmailSender writeTo={name}/></Modal>
          }
          <style jsx>{`
            .letterbox-container {
              display: flex;
              margin-top: 20px;
            }
            .gap {
              margin-top: 20px;
            }
            .letterbox-input {
              background-color: transparent;
              border: 1px solid ${LINK.FOREGROUND};
              margin: 0;
              min-width: 260px;
              display: block;
              font-size: 1rem;
              box-sizing: content-box;
              padding: 1rem;
              border-radius: 0.3rem;
              height: 1.1rem;
              color: transparent;
              text-shadow: 0 0 0 #EBEBEB;
            }
          `}</style>
        </form>
      </div>
    );
  }
}

export default LetterBox;
