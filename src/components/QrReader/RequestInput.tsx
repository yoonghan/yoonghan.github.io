import React, { Component } from 'react';

interface IRequestInput {
  callback: (pinNo:string) => void
}

const RequestInput:React.SFC<IQrReader> = ({callback}) => {
  const [input, setInput] = React.useState("");

  const _updateInput = (event) => {
    setInput(event.target.value);
  }

  const _submit = (event) => {
    event.preventDefault();
    callback(input);
  }

  return (
    <form onSubmit={_submit}>
      <fieldset>
        <label>Pin no#</label>
        <input type="text" name="input" onChange={_updateInput}/>
        <input type="submit" value="Submit"/>
      </fieldset>
    </form>
  )
}

export default RequestInput;
