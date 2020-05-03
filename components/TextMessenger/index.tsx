import * as React from "react";
import {LINK} from "../../shared/style";
import Autosuggest from "react-autosuggest";
import {useDropzone} from "react-dropzone";

export const ENUM_DISPLAY_TYPE = {
  SYSTEM: 0,
  MESSAGE: 1
}

interface TextMessengerProps {
  onFocusCallback?: (event :React.FormEvent<HTMLInputElement>)=>void;
  onBlurCallback: (event :React.FormEvent<HTMLInputElement>)=>void;
  onSubmitCallback: (event :React.FormEvent<HTMLFormElement>, typedInput:string, displayType:number)=>void;
  maxLength?: number;
  filterSuggestion: (value:string) => Array<string>;
}

const _getSuggestionValue = (suggestion:string) => (
  suggestion
);

const _renderSuggestion = (suggestion:string) => (
  <div>
    {suggestion}
  </div>
);

const _onClickSelect = (event: React.FormEvent<HTMLInputElement>) => {
  (event.target as HTMLInputElement).select();
}

const dropFile = (onSubmitCallback: (event :React.FormEvent<HTMLFormElement>, typedInput:string, displayType:number)=>void) => (acceptedFiles:File[]) => {
  if(acceptedFiles.length !== 1) {
    alert("System supports only single file");
  }

  const shouldUpload = confirm("Share file ?");
  const synthensizedEvent:any = {
    preventDefault: ()=>{}
  }

  if(shouldUpload) {
    const formData = new FormData();
    formData.append("file", acceptedFiles[0]);

    onSubmitCallback(synthensizedEvent, `Uploading file ${acceptedFiles[0].name}...`, ENUM_DISPLAY_TYPE.SYSTEM);

    fetch('/api/firebase', {
      method: 'POST',
      body: formData
    })
    .then(resp => (resp.json()))
    .then(data => {
      if(data.status === "ok") {
        onSubmitCallback(synthensizedEvent, data.data, ENUM_DISPLAY_TYPE.MESSAGE);
      }
      else {
        onSubmitCallback(synthensizedEvent, "[File Sent failed]", ENUM_DISPLAY_TYPE.SYSTEM);
      }
    });
  }
}

const TextMessenger:React.FC<TextMessengerProps> = (props) => {
  const onDrop = React.useCallback(dropFile(props.onSubmitCallback), []);
  const autoSuggestRef = React.useRef<Autosuggest>(null);
  const [value, setValue] = React.useState("");
  const [suggestions, setSuggestions] = React.useState<Array<string>>([]);
  const {getRootProps, getInputProps, inputRef} = useDropzone({onDrop});
  const inputProps = React.useMemo(() => buildInputProps(), [value]); //Reduce from file drag changes.

  React.useEffect(()=>{
    if(autoSuggestRef !== null && autoSuggestRef.current !== null) {
      (autoSuggestRef.current as any).input.focus();
    }
  }, [])

  function buildInputProps() {
    return {
      autoFocus: true,
      value: value,
      onChange: _onChange,
      onClick: _onClickSelect,
      onBlur: _onBlur,
      onFocus: _onFocus,
      maxLength: (props.maxLength ? props.maxLength : 50),
    };
  }

  function _onChange({}, _newValue:any) {
    const { newValue } = _newValue;
    setValue(newValue);
  };

  function _onSuggestionsFetchRequested(_value: any) {
    const {value} = _value;
    const filteredResult = props.filterSuggestion(value);
    setSuggestions(filteredResult);
  };

  function _onSuggestionsClearRequested() {
    setSuggestions([]);
  };

  function _onSubmit(event :React.FormEvent<HTMLFormElement>) {
    if(value.trim() === "") {
      event.preventDefault();
      return;
    }

    props.onSubmitCallback(event, value, ENUM_DISPLAY_TYPE.MESSAGE);
    setValue("");
  }

  function _onBlur(event :React.FormEvent<HTMLInputElement>) {
    props.onBlurCallback(event);
  }

  function _onFocus(event :React.FormEvent<HTMLInputElement>) {
    if(props.onFocusCallback) {
      props.onFocusCallback(event);
    }
  }

  const clickAttachmentBtn = () => {
    if(inputRef !== null && inputRef.current !== null)
      inputRef.current.click();
  }

  return (
    <form onSubmit={_onSubmit} className="textmessenger-container" {...getRootProps({
      onClick: event => event.stopPropagation()
    })} id={"textmessenger-form"}>
      <Autosuggest
        ref={autoSuggestRef}
        suggestions={suggestions}
        onSuggestionsFetchRequested={_onSuggestionsFetchRequested}
        onSuggestionsClearRequested={_onSuggestionsClearRequested}
        getSuggestionValue={_getSuggestionValue}
        renderSuggestion={_renderSuggestion}
        inputProps={inputProps}
      />
      <button id="command-enter" aria-label="Enter">
        <i className="fas fa-arrow-right"></i>
      </button>
      <button id="command-upload" aria-label="Upload" onClick={clickAttachmentBtn}>
        <i className="fas fa-paperclip"></i>
      </button>
      <input {...getInputProps()} />
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
        #command-upload {
          height: 2.2rem;
          transition-property: color, background;
          transition-duration: .15s;
          transition-timing-function: ease-in-out;
          color: ${LINK.FOREGROUND};
          background: none;
          font-size: 0.8rem;
          user-select: none;
          cursor: pointer;
        }
        #command-enter:hover, #command-upload:hover {
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

export default (TextMessenger);
