import * as React from "react";
import {LINK} from "../../shared/style";
import Autosuggest from 'react-autosuggest';

interface CommandBarInputProps {
  onBlurCallback: (event :React.FormEvent<HTMLInputElement>)=>void;
  onFocusCallback: (event :React.FormEvent<HTMLInputElement>)=>void;
  onSubmitCallback: (event :React.FormEvent<HTMLFormElement>, typedInput:string)=>void;
  maxLength?: number;
}

interface CommandBarInputStates {
}

export class CommandBarInput extends React.Component<CommandBarInputProps, CommandBarInputStates> {
<<<<<<< HEAD:components/TextMessenger/index.tsx

=======
>>>>>>> eaa24758cdf2a8bdfaff72991dfc9ce64ec0e404:components/TextMessenger/index.tsx
  private inputProps:any;

  constructor(props:CommandBarInputProps) {
    super(props);
    this.inputProps = {
<<<<<<< HEAD:components/TextMessenger/index.tsx
=======
      value: "jljlljjl",
>>>>>>> eaa24758cdf2a8bdfaff72991dfc9ce64ec0e404:components/TextMessenger/index.tsx
      onChange: this._onChange,
      onClick: this._onClickSelect,
      onFocus: this._onFocus,
      onBlur: this._onBlur,
<<<<<<< HEAD:components/TextMessenger/index.tsx
      maxLength: (props.maxLength ? props.maxLength : 50)
=======
      maxLength: props.maxLength? props.maxLength:50
>>>>>>> eaa24758cdf2a8bdfaff72991dfc9ce64ec0e404:components/TextMessenger/index.tsx
    };
  }

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
    return newValue;
  };

  _onSuggestionsFetchRequested = (_value:any) => {
    const { value } = _value;
    return value;
  };

  _onSuggestionsClearRequested = () => {
<<<<<<< HEAD:components/TextMessenger/index.tsx

=======
>>>>>>> eaa24758cdf2a8bdfaff72991dfc9ce64ec0e404:components/TextMessenger/index.tsx
  };

  _onSubmit = (event :React.FormEvent<HTMLFormElement>) => {
    this.props.onSubmitCallback(event, "");
  }

  _onFocus = (event :React.FormEvent<HTMLInputElement>) => {
    this.props.onFocusCallback(event);
  }

  _onBlur = (event :React.FormEvent<HTMLInputElement>) => {
    this.props.onBlurCallback(event);
  }

  render() {
    return (
      <form onSubmit={this._onSubmit} className="command-container">
<<<<<<< HEAD:components/TextMessenger/index.tsx
        <div className="command-text-container">
          <Autosuggest
            suggestions={[""]}
            onSuggestionsFetchRequested={this._onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this._onSuggestionsClearRequested}
            getSuggestionValue={this._getSuggestionValue}
            renderSuggestion={this._renderSuggestion}
            inputProps={this.inputProps}
          />
        </div>
=======
        <Autosuggest
          suggestions={[""]}
          onSuggestionsFetchRequested={this._onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this._onSuggestionsClearRequested}
          getSuggestionValue={this._getSuggestionValue}
          renderSuggestion={this._renderSuggestion}
          inputProps={this.inputProps}
        />
>>>>>>> eaa24758cdf2a8bdfaff72991dfc9ce64ec0e404:components/TextMessenger/index.tsx
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
<<<<<<< HEAD:components/TextMessenger/index.tsx
            top: 1.5rem;
            width: 260px;
=======
            justify-content: center;
            display: flex;
            width: 100%;
>>>>>>> eaa24758cdf2a8bdfaff72991dfc9ce64ec0e404:components/TextMessenger/index.tsx
          }
          #command-enter {
            height: 2.2rem;
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
            padding: 0.5rem;
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
