import * as React from "react";
import produce, {Draft} from "immer";
import {LINK} from "../../shared/style";
import Autosuggest from 'react-autosuggest';

interface TextMessengerProps {
  onBlurCallback: (event :React.FormEvent<HTMLInputElement>)=>void;
  onSubmitCallback: (event :React.FormEvent<HTMLFormElement>, typedInput:string)=>void;
  maxLength?: number;
  filterSuggestion: (value:string) => Array<string>;
}

interface TextMessengerStates {
  value: string;
  suggestions: Array<string>;
}

export class TextMessenger extends React.Component<TextMessengerProps, TextMessengerStates> {
  private inputProps:any;
  private inputRef = React.createRef<Autosuggest<string>>();

  constructor(props:TextMessengerProps) {
    super(props);
    this.inputProps = {
      value: "",
      onChange: this._onChange,
      onClick: this._onClickSelect,
      onBlur: this._onBlur,
      maxLength: (props.maxLength ? props.maxLength : 50)
    };
    this.state = {
      value: "",
      suggestions: []
    }
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
    this.setState(
      produce((draft: Draft<TextMessengerStates>) => {
        draft.value = newValue;
      })
    );
  };

  _onSuggestionsFetchRequested = (_value: any) => {
    const {value} = _value;
    this.setState(
      produce((draft: Draft<TextMessengerStates>) => {
        draft.suggestions = this.props.filterSuggestion(value);
      })
    );
  };

  _onSuggestionsClearRequested = () => {
    this.setState(
      produce((draft: Draft<TextMessengerStates>) => {
        draft.suggestions = [];
      })
    );
  };

  _onSubmit = (event :React.FormEvent<HTMLFormElement>) => {
    const {value} = this.state;
    if(value.trim() === "") {
      event.preventDefault();
      return;
    }

    this.props.onSubmitCallback(event, this.state.value);
    this.setState(
      produce((draft: Draft<TextMessengerStates>) => {
        draft.value = "";
      })
    );
  }

  _onBlur = (event :React.FormEvent<HTMLInputElement>) => {
    this.props.onBlurCallback(event);
  }

  componentDidMount() {
    if(this.inputRef !== null && this.inputRef.current !== null) {
      (this.inputRef.current as any).input.focus();
    }
  }

  render() {
    const {value, suggestions} = this.state;

    this.inputProps["value"] = value;

    return (
      <form onSubmit={this._onSubmit} className="textmessenger-container">
        <Autosuggest
          ref={this.inputRef}
          suggestions={suggestions}
          onSuggestionsFetchRequested={this._onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this._onSuggestionsClearRequested}
          getSuggestionValue={this._getSuggestionValue}
          renderSuggestion={this._renderSuggestion}
          inputProps={this.inputProps}
        />
        <button id="command-enter" className="style-scope ytd-searchbox" aria-label="Enter">
          <i className="fas fa-arrow-right"></i>
        </button>
        <style jsx>{`
          .textmessenger-container {
            display: flex;
            font-size: 0.8rem;
            position: relative;
            justify-content: center;
            display: flex;
            width: 100%;
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
          .textmessenger-container :global(.react-autosuggest__input) {
            font-family: Inconsolata;
            background-color: transparent;
            width: 200px;
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
            color: ${LINK.FOREGROUND};
            text-shadow: 0 0 0 #EBEBEB;
          }
          .textmessenger-container :global(.react-autosuggest__input:focus) {
            outline: none;
          }
          .textmessenger-container :global(.react-autosuggest__input--focused) {
            outline: none;
          }
          .textmessenger-container :global(.react-autosuggest__suggestions-container--open) {
            border: 1px solid #aaa;
            font-family: Inconsolata;
            color: ${LINK.FOREGROUND};
            background: ${LINK.BACKGROUND};
            font-size: 1rem;
            z-index: 2;
            margin-top: 2px;
            text-align: left;
            padding: 2px 4px;
            position: absolute;
            width: 200px;
          }
          .textmessenger-container :global(.react-autosuggest__suggestions-list) {
            margin: 0;
            padding: 0;
            list-style-type: none;
          }
          .textmessenger-container :global(.react-autosuggest__suggestion) {
            cursor: pointer;
          }
          .textmessenger-container :global(.react-autosuggest__suggestion--highlighted) {
            background-color: #DDD;
            color: #000;
          }
        `}</style>
      </form>
    );
  }
}

export default (TextMessenger);
