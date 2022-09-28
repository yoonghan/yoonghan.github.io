import Button from "../Button"
import produce, { Draft } from "immer"
import Modal from "../Modal"
import EmailSender from "./EmailSender"
import { LINK, LINK_COLOR } from "../../shared/style"
import { EMAIL } from "../../shared/const"

export interface LetterBoxProps {}

export interface LetterBoxStates {
  isDialogShow: boolean
  name: string
}

class LetterBox extends React.PureComponent<LetterBoxProps, LetterBoxStates> {
  constructor(props: LetterBoxProps) {
    super(props)
    this.state = {
      isDialogShow: false,
      name: "",
    }
  }

  _closeCallback = () => {
    this.setState(
      produce((draft: Draft<LetterBoxStates>) => {
        draft.isDialogShow = false
        draft.name = ""
      })
    )
  }

  _onSubmitPressed = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    this._onClickSendButton()
  }

  _onClickSendButton = () => {
    const { name } = this.state
    if (!name || name.trim() === "") {
      return
    }

    this.setState(
      produce((draft: Draft<LetterBoxStates>) => {
        draft.isDialogShow = true
      })
    )
  }

  _onChangeLetterBoxInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value
    this.setState(
      produce((draft: Draft<LetterBoxStates>) => {
        draft.name = input
      })
    )
  }

  _email = () => {
    return EMAIL.replace(/_/g, "")
  }

  _renderNoJs = () => (
    <span>
      Write to us at{" "}
      <a href={`mailto:${this._email()}`} className="container">
        {this._email()}
      </a>
      <style jsx>{`
        .container {
          color: orange;
        }
      `}</style>
    </span>
  )

  render() {
    const { isDialogShow, name } = this.state

    return (
      <div>
        If you are interested to talk to us, leave us your contact. Let us reach
        you instead.
        <form
          className={"letterbox-container"}
          onSubmit={this._onSubmitPressed}
        >
          <input
            type="text"
            autoComplete="off"
            className={"letterbox-input"}
            maxLength={200}
            placeholder={"Honorific and name"}
            onChange={this._onChangeLetterBoxInput}
            value={name}
          />
          <Button onClickCallback={this._onClickSendButton}>Send</Button>
          {isDialogShow && (
            <Modal cancelCallback={this._closeCallback}>
              <EmailSender writeFrom={name.trim()} writeTo={this._email()} />
            </Modal>
          )}
          <style jsx>{`
            .letterbox-container {
              display: flex;
              margin-top: 20px;
              justify-content: center;
            }
            .gap {
              margin-top: 20px;
            }
            .letterbox-input {
              color: ${LINK_COLOR};
              background-color: transparent;
              border: 1px solid ${LINK.FOREGROUND};
              margin: 0;
              min-width: 200px;
              display: block;
              font-size: 1rem;
              box-sizing: content-box;
              padding: 1rem;
              border-radius: 0.3rem;
              height: 1.1rem;
              text-shadow: 0 0 0 #ebebeb;
            }
          `}</style>
        </form>
      </div>
    )
  }
}

export default LetterBox
