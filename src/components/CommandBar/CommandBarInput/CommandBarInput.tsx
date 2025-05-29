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
const AVAILABLE_COMMAND_KEYS_WITH_HELP = [
  ...AVAILABLE_COMMAND_KEYS,
  "help",
  "man",
]

const CommandBarInput = (props: Props) => {
  const commandOptions = React.useMemo(
    () =>
      AVAILABLE_COMMAND_KEYS_WITH_HELP.map((command) => (
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
      <div className={`${styles.command_text_prompt}`}>walcron$</div>
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
          aria-label="Command prompt"
        />
        <datalist id="commands">{commandOptions}</datalist>
      </div>
      <button type="submit" className="pl-2">
        GO
      </button>
    </form>
  )
}

export default CommandBarInput
