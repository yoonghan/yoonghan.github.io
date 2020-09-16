import React, { Component } from 'react';
import dynamic from "next/dynamic";
import RequestInput from "./RequestInput";

const QrReaderLib = dynamic(
  () => import("react-qr-reader"),
  { ssr: false }
)

interface IQrReader {
  callback: (pinNo:string) => void
}

enum EnumStates {
  SCAN_QR,
  SCAN_INPUT,
  ERROR,
  TIMEOUT
};

const QrReader:React.SFC<IQrReader> = ({callback}) => {
  const [canScan, setCanScan] = React.useState(true);
  const [scanError, setScanError] = React.useState("");
  const [counter, setCounter] = React.useState(0);
  const [correctInput, setCorrectInput] = React.useState(false);
  const idleAllowedTime = 3000;
  const countAllowed = 3;
  var oldTimer:any = null;

  const _handleScan = data => {
    if(data === "Walcron Office 10101") {
      setCorrectInput(true);
    }
  }

  const _handleError = err => {
    setScanError(err);
  }

  const _startCount = (counter) => {
    const _counter = counter + 1;

    oldTimer = setTimeout(()=>{
      setCounter(_counter);
      if(_counter < countAllowed) {
        _startCount(_counter);
      }
    },
    idleAllowedTime);
  }

  const _resetScan = () => {
    if(oldTimer !== null) {
      clearTimeout(oldTimer);
    }
    setCanScan(true);
    setCounter(0);
    setScanError("");
    setCorrectInput(false);
    _startCount(0);
  }

  const _renderAllowRescan = () => {
    return <button onClick={_resetScan}>Restart</button>
  }

  const _renderInputRequest = (state) => {
    switch(state) {
      case EnumStates.SCAN_QR:
        return (<QrReaderLib
          delay={300}
          onError={_handleError}
          onScan={_handleScan}
          style={{ width: '50%' }}
        />);
      case EnumStates.SCAN_INPUT:
        return (<RequestInput callback={callback}/>);
      case EnumStates.ERROR:
        return (<p>{scanError}</p>);
      default:
        return (_renderAllowRescan());
    }
  }

  const _getState = () => {
    if(canScan) {
      return EnumStates.SCAN_QR;
    }
    if(correctInput) {
      return EnumStates.SCAN_INPUT;
    }
    if(scanError !== "") {
      return EnumStates.ERROR;
    }
    return EnumStates.RETRY;
  }

  React.useEffect(() => {
    _startCount(0);
  }, []);

  React.useEffect(() => {
    if(scanError !== "" || counter >= countAllowed || correctInput) {
      setCanScan(false);
    }
  }, [scanError, counter]);

  return (
    <div>{_renderInputRequest(_getState())}</div>
  )
}

export default QrReader;
