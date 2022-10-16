import * as React from "react"
import Autosuggest, { InputProps } from "react-autosuggest"
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
  const [suggestions, setSuggestions] = React.useState<string[]>([])
  const [showPrompt, setShowPrompt] = React.useState(false)

  const getSuggestions = (value: string) => {
    const inputValue = value.trim().toLowerCase()
    return AVAILABLE_COMMAND_KEYS.filter(
      (cmd) => cmd.toLowerCase().slice(0, inputValue.length) === inputValue
    ).slice(0, 10)
  }

  const getSuggestionValue = (suggestion: string) => suggestion

  const renderSuggestion = (suggestion: string) => <div>{suggestion}</div>

  const onChange = ({}, _newValue: any) => {
    const { newValue } = _newValue
    props.onSuggestedInputCallback(newValue)
  }

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    props.onSubmitCallback(event, props.suggestedInput)
  }

  const onFocus = (event: React.FormEvent<HTMLInputElement>) => {
    setShowPrompt(true)
    props.onFocusCallback(event)
  }

  const onBlur = (event: React.FormEvent<HTMLInputElement>) => {
    setShowPrompt(false)
    props.onBlurCallback(event)
  }

  const inputProps = {
    value: props.suggestedInput,
    onChange: onChange,
    onFocus: onFocus,
    onBlur: onBlur,
    maxLength: 22,
    "data-testid": "commandBar",
  } as unknown as InputProps<string>

  return (
    <form onSubmit={onSubmit} className={styles["command-container"]}>
      <div className={styles["command-text-container"]}>
        <div className={styles["command-text-prompt"]}>walcron@tm$</div>
        <div className={styles["prompt"]}>
          <span className={styles["promptIn"]}>{props.suggestedInput}</span>
          {showPrompt && <span data-testid="prompter">&#9608;</span>}
        </div>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={(value: any) => {
            setSuggestions(getSuggestions(value?.value))
          }}
          onSuggestionsClearRequested={() => {
            setSuggestions([])
          }}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
        />
      </div>
      <button
        className={`${styles["command-enter"]} style-scope ytd-searchbox`}
        aria-label="Enter"
        data-testid="commandBar-enter"
      >
        <i className="fas fa-arrow-right">&#x21AA;</i>
      </button>
    </form>
  )
}

export default CommandBarInput
