`use strict`

/**
  A command prompt input
  **/

import * as React from "react";

export interface CommandBarInputProps {
  onBlurCallback: (event :React.FormEvent<HTMLInputElement>)=>void;
  onSubmitCallback: (event :React.FormEvent<HTMLFormElement>)=>void;
  isPromptWait: boolean;
}

const CommandBarInput: React.SFC<CommandBarInputProps> = ({onBlurCallback, onSubmitCallback, isPromptWait}) => {
  function _onClickSelect(event: React.FormEvent<HTMLInputElement>) {
    (event.target as any).select();
  }

  return (
    <form onSubmit={onSubmitCallback} className="command-container">
      <div className="command-text-container">
        <div className="command-text-prompt">
          guest@walcron$
        </div>
        <input
          id="command-text"
          autoCapitalize="none"
          autoComplete="off"
          autoCorrect="off"
          tabIndex={0}
          type="text"
          spellCheck={false}
          aria-label="command prompt"
          aria-haspopup="false"
          aria-autocomplete="list"
          dir="ltr"
          onBlur={onBlurCallback}
          onClick={_onClickSelect}
          />
        {isPromptWait && <span>&#9608;</span>}
      </div>
      <button id="command-enter" className="style-scope ytd-searchbox" aria-label="Enter">
        <i className="fas fa-arrow-right"></i>
      </button>
      <style jsx>{`
        .command-container {
          display: flex;
          font-size: 0.8rem;
          position: relative;
        }
        .command-text-container	span {
          color: #FFF;
        	position: absolute;
        	width: 1px;
          height: 100%;
        	left: 7rem;
          top: 0.4rem;
        	animation-name: blink;
        	animation-duration: 800ms;
        	animation-iteration-count: infinite;
        	opacity: 1;
        }
        .command-text-container input:focus + span {
        	display: none;
        }
        @keyframes blink {
        	from { opacity: 1; }
        	to { opacity: 0; }
        }
        .command-text-prompt {
          width: 7rem;
          height: 100%;
          display: flex;
          position: absolute;
          align-items: center;
          pointer-events: none;
          justify-content: center;
          color: #FFF;
          font-family: Inconsolata;
        }
        #command-text {
          font-family: Inconsolata;
          color: #EBEBEB;
          background-color: #343436;
          width: 250px;
          border: 1px solid;
          margin: 0;
          display: block;
          min-width: 0;
          font-size: 0.8rem;
          box-sizing: content-box;
          -webkit-tap-highlight-color: transparent;
          padding: 0.5rem 2rem 0.5rem 7rem;
          border-radius: 0.3rem;
        }
        #command-text::placeholder {
          color: #A2A2A2;
        }
        #command-enter {
          position: absolute;
          height: 100%;
          right: 3px;
          transition-property: color, background;
          transition-duration: .15s;
          transition-timing-function: ease-in-out;
          color: #FFF;
          border: none;
          background: none;
          font-size: 0.8rem;
          user-select: none;
          cursor: pointer;
        }
        #command-enter:hover {
          color: #000;
        }
        #command-enter:active {
          margin: 1px 0 0 1px;
        }
      `}</style>
    </form>
  );
}

export default CommandBarInput;
