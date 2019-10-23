import * as React from "react";
import produce, {Draft} from "immer";
import {LINK} from "../../shared/style";
import Autosuggest from 'react-autosuggest';
import {AvailableInput} from "./CommandSearch";

interface CommandBarInputProps {
  onBlurCallback: (event :React.FormEvent<HTMLInputElement>)=>void;
  onFocusCallback: (event :React.FormEvent<HTMLInputElement>)=>void;
  onSubmitCallback: (event :React.FormEvent<HTMLFormElement>, typedInput:string)=>void;
}

interface CommandBarInputStates {
  value: string;
  suggestions: Array<string>;
  showPrompt: boolean;
}

export class CommandBarInput extends React.Component<CommandBarInputProps, CommandBarInputStates> {
  private AVAILABLE_COMMAND_KEYS = Object.keys(AvailableInput);

  constructor(props:CommandBarInputProps) {
    super(props);
    this.state = {
      value: '',
      suggestions: [],
      showPrompt: false
    };
  }

  _getSuggestions = (value:string) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : this.AVAILABLE_COMMAND_KEYS.filter(cmd =>
      cmd.toLowerCase().slice(0, inputLength) === inputValue
    ).slice(0, 10);
  };

  _getSuggestionValue = (suggestion:string) => (
    suggestion
  );

  _renderSuggestion = (suggestion:string) => (
    <div>
      {suggestion}
    </div>
  );

  _onClickSelect = (event: React.FormEvent<HTMLInputElement>) => {
    (event.target as HTMLInputElement).select();
  }

  _onChange = ({}, _newValue:any) => {
    const { newValue } = _newValue;
    this.setState(
      produce((draft: Draft<CommandBarInputStates>) => {
        draft.value = newValue;
      })
    );
  };

  _onSuggestionsFetchRequested = (_value:any) => {
    const { value } = _value;
    this.setState(
      produce((draft: Draft<CommandBarInputStates>) => {
        draft.suggestions = this._getSuggestions(value);
      })
    );
  };

  _onSuggestionsClearRequested = () => {
    this.setState(
      produce((draft: Draft<CommandBarInputStates>) => {
        draft.suggestions = [];
      })
    );
  };

  _onSubmit = (event :React.FormEvent<HTMLFormElement>) => {
    this.props.onSubmitCallback(event, this.state.value);
  }

  _onFocus = (event :React.FormEvent<HTMLInputElement>) => {
    this.setState(
      produce((draft: Draft<CommandBarInputStates>) => {
        draft.showPrompt = true;
      })
    );
    this.props.onFocusCallback(event);
  }

  _onBlur = (event :React.FormEvent<HTMLInputElement>) => {
    this.setState(
      produce((draft: Draft<CommandBarInputStates>) => {
        draft.showPrompt = false;
      })
    );
    this.props.onBlurCallback(event);
  }

  _renderPrompt = () => {
    const { value, showPrompt } = this.state;
    if(!showPrompt || value.length > 22) {
      return <span/>;
    }
    return <span>&#9608;</span>;
  }

  render() {
    const { value, suggestions } = this.state;

    const inputProps = {
      value,
      onChange: this._onChange,
      onClick: this._onClickSelect,
      onFocus: this._onFocus,
      onBlur: this._onBlur,
      maxLength: 22
    };

    return (
      <form onSubmit={this._onSubmit} className="command-container">
        <div className="command-text-container">
          <div className={"prompt"}><span className={"promptIn"}>{value}</span>{this._renderPrompt()}</div>
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={this._onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this._onSuggestionsClearRequested}
            getSuggestionValue={this._getSuggestionValue}
            renderSuggestion={this._renderSuggestion}
            inputProps={inputProps}
          />
        </div>
        <button id="command-enter" className="style-scope ytd-searchbox" aria-label="Enter">
          <i className="fas fa-arrow-right"></i>
        </button>

        <style jsx>{`
          .container {
            position: relative;
          }
          .command-container {
            display: flex;
            font-size: 0.8rem;
            position: relative;
            top: 1.5rem;
            width: 260px;
          }
          .prompt {
            z-index: -1;
            color: ${LINK.FOREGROUND};
            font-family: Inconsolata;
          	position: absolute;
          	left: 5.2rem;
            top: 0.6rem;
          	animation-name: blink;
            font-size: 0.8rem;
          	animation-duration: 800ms;
          	animation-iteration-count: infinite;
          }
          .promptIn {
            visibility: hidden;
          }
          @keyframes blink {
          	from { opacity: 1; }
          	to { opacity: 0; }
          }
          #command-enter {
            position: absolute;
            height: 2.2rem;
            right: 3px;
            transition-property: color, background;
            transition-duration: .15s;
            transition-timing-function: ease-in-out;
            color: ${LINK.FOREGROUND};
            border: none;
            background: none;
            font-size: 0.8rem;
            user-select: none;
            cursor: pointer;
          }
          #command-enter:hover {
            color: ${LINK.BACKGROUND};
            background: ${LINK.FOREGROUND};
          }
          #command-enter:active {
            margin: 1px 0 0 1px;
          }
          :global(.react-autosuggest__input) {
            font-family: Inconsolata;
            background-color: transparent;
            width: 150px;
            border: 1px solid ${LINK.FOREGROUND};
            margin: 0;
            display: block;
            min-width: 0;
            font-size: 0.8rem;
            box-sizing: content-box;
            -webkit-tap-highlight-color: transparent;
            padding: 0.5rem 2rem 0.5rem 5rem;
            border-radius: 0.3rem;
            height: 1.1rem;
            color: transparent;
            text-shadow: 0 0 0 #EBEBEB;
          }
          :global(.react-autosuggest__input:focus) {
            outline: none;
          }
          :global(.react-autosuggest__input--focused) {
            outline: none;
          }

          :global(.react-autosuggest__suggestions-container--open) {
            border: 1px solid #aaa;
            font-family: Inconsolata;
            color: ${LINK.FOREGROUND};
            background: ${LINK.BACKGROUND};
            font-size: 0.7rem;
            z-index: 2;
            margin-top: 2px;
            margin-left: 5rem;
            text-align: left;
            padding: 0 4px;
          }

          :global(.react-autosuggest__suggestions-list) {
            margin: 0;
            padding: 0;
            list-style-type: none;
          }

          :global(.react-autosuggest__suggestion) {
            cursor: pointer;
          }

          :global(.react-autosuggest__suggestion--highlighted) {
            background-color: #DDD;
            color: #000;
          }

        `}</style>
      </form>
    );
  }
}

export default (CommandBarInput);
