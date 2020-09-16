`use strict`

/**
  A command prompt input
  **/

import * as React from "react";
import produce, {Draft} from "immer";
import { withRouter } from 'next/router';
import { WithRouterProps } from "next/dist/client/with-router";
import CommandBarInput from "./CommandBarInput";
import {exec} from "./ExecuteCommand";

export interface NoSSRCommandBarProps extends WithRouterProps {
}

export interface NoSSRCommandBarStates {
  renderExecutedCommand: JSX.Element;
  suggestedInput: string;
}

class NoSSRCommandBar extends React.PureComponent<NoSSRCommandBarProps, NoSSRCommandBarStates> {
  private bodyElement = document.getElementsByTagName("body")[0];
  private elem:HTMLDivElement;

  constructor(props:NoSSRCommandBarProps) {
    super(props);
    this.elem = document.createElement('div');
    this.state = {
      suggestedInput: "",
      renderExecutedCommand: <React.Fragment/>
    }
  }

  componentDidMount() {
    this.bodyElement.appendChild(this.elem);
  }

  componentWillUnmount() {
    this.bodyElement.removeChild(this.elem);
  }

  _cancelExecutedCommand = (self: NoSSRCommandBar) => () => {
    self.setState(
      produce((draft: Draft<NoSSRCommandBarStates>) => {
        draft.renderExecutedCommand = <React.Fragment/>;
      })
    );
  }

  _specialInputCallback = (self: NoSSRCommandBar) => (suggestedInput: string) => {
    self.setState(
      produce((draft: Draft<NoSSRCommandBarStates>) => {
        draft.suggestedInput = suggestedInput;
      })
    );
  }

  _handleSubmit = (event :React.FormEvent<HTMLFormElement>, typedInput:string) => {
    event.preventDefault();

    if(!typedInput || typedInput.trim() === '') {
      return;
    }
    this.setState(
      produce((draft: Draft<NoSSRCommandBarStates>) => {
        draft.renderExecutedCommand = exec(
          this.elem, this._cancelExecutedCommand(this), this.props.router, this._specialInputCallback(this))(typedInput);
      })
    );
  }

  _onBlurCommandPrompt = () => {
  }

  _onFocusCommandPrompt = () => {
  }

  _inputCallback = (suggestedInput:string) => {
    this.setState(
      produce((draft: Draft<NoSSRCommandBarStates>) => {
        draft.suggestedInput = suggestedInput;
      })
    );
  }

  render() {
    return (
      <div className="container">
        <CommandBarInput
          onSuggestedInputCallback={this._inputCallback}
          onBlurCallback={this._onBlurCommandPrompt}
          onFocusCallback={this._onFocusCommandPrompt}
          onSubmitCallback={this._handleSubmit}
          suggestedInput={this.state.suggestedInput}
        />
        {this.state.renderExecutedCommand}
        <style jsx>{`
          .container {
            position: relative;
          }
        `}</style>
      </div>
    );
  }
}

export default withRouter(NoSSRCommandBar);
