import * as React from "react"
import { AvailableInput } from "../CommandSearch/CommandSearch"
import styles from "./CommandBarInput.module.css"

interface Props {
  suggestedInput: string
  onSuggestedInputCallback: (str: string) => void
  onBlurCallback: (event: React.FormEvent<HTMLInputElement>) => void
  onFocusCallback: (event: React.FormEvent<HTMLInputElement>) => void
  onSubmitCallback: (
    event: React.FormEvent<HTMLFormElement>,
    typedInput: string
  ) => void
}

const AVAILABLE_COMMAND_KEYS = Object.keys(AvailableInput)

const CommandBarInput = (props: Props) => {
  const commandOptions = React.useMemo(
    () =>
      AVAILABLE_COMMAND_KEYS.map((command) => (
        <option value={command} key={command} />
      )),
    []
  )

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    props.onSuggestedInputCallback(value)
  }

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    props.onSubmitCallback(event, props.suggestedInput)
  }

  const onFocus = (event: React.FormEvent<HTMLInputElement>) => {
    props.onFocusCallback(event)
  }

  const onBlur = (event: React.FormEvent<HTMLInputElement>) => {
    props.onBlurCallback(event)
  }

  return (
    <form onSubmit={onSubmit} className={`${styles["command-container"]}`}>
      <div>
        <div className={`${styles["command-text-prompt"]}`}>walcron@tm$</div>
        <div className={"prompt"}>
          <span className={`${styles["promptIn"]}`}>
            {props.suggestedInput}
          </span>
          <span data-testid="prompter">&#9608;</span>
        </div>
        <div>
          <input
            type="text"
            list="commands"
            maxLength={22}
            value={props.suggestedInput}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            className={styles.autosuggest__input}
          />
          <datalist id="commands">{commandOptions}</datalist>
        </div>
      </div>
      <button
        className={`${styles["command-enter"]} style-scope ytd-searchbox`}
        aria-label="Enter"
      >
        <i>&#x21AA;</i>
      </button>
    </form>
  )
}

export default CommandBarInput
