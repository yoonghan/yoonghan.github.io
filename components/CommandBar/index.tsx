`use strict`

/**
  A command prompt input
  **/

import * as React from "react";
import produce, {Draft} from "immer";
import CommandBarInput from "./CommandBarInput";

export interface CommandBarProps {
}

export interface CommandBarStates {
  typedInput: string;
}

class CommandBar extends React.PureComponent<CommandBarProps, CommandBarStates> {

  constructor(props:CommandBarProps) {
    super(props);
    this.state = {
      typedInput: ""
    }
  }

  _handleSubmit = (event :React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  }

  _onBlurCommandPrompt = (event: React.FormEvent<HTMLInputElement>) => {
    const value = (event.target as any).value;
    this.setState(
      produce((draft: Draft<CommandBarStates>) => {
          draft.typedInput = value;
      })
    );
  }

  _shouldDisplayPrompt = () => {
    const {typedInput} = this.state;
    return typedInput === "";
  }

  render() {
    return (
      <CommandBarInput
        onBlurCallback={this._onBlurCommandPrompt}
        onSubmitCallback={this._handleSubmit}
        isPromptWait={this._shouldDisplayPrompt()}
      />
    );
  }
}

export default CommandBar;
