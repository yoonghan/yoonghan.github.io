import * as React from "react";
import PusherJS from 'pusher-js';
import NoSSR from 'react-no-ssr';
import produce, {Draft} from "immer";
import { HtmlHead } from '../components/HtmlHead';
import HeaderOne from "../components/HeaderOne";
import CommandBar from "../components/CommandBar";
import Footer from "../components/Footer";
import { PUSHER } from "../shared/const";
import Button from "../components/Button";
import TextMessenger from "../components/TextMessenger";
import Textarea from "../components/Textarea";
import { compose } from 'redux';
import withConnectivity, { IWithConnectivity } from "../hoc/withConnectivity";
import withMessenger, { IWithMessenger, EnumConnection } from "../hoc/withMessenger";
import Loader from "../components/Loader";
import NoSSRChatMessageBox, {NoSSRChatMessageBoxProps} from "../components/NoSSRChatMessageBox";

const allowedCalls = ["up", "down", "left", "right"];
const enumStatus = {
  INIT: 1,
  INIT_TOKEN: 2,
  INIT_CONNECT: 3,
  COMPLETE: 4,
  INIT_DISCONNECT: 5
}

/* Functions */
const print = (ref) => (sender) => (message) => {
  if(ref && ref.current) {
    ref.current.addMessage(
      sender,
      message);
  }
}

const getToken = (tokenApi) => {
  if(!tokenApi.isLoading) {
    tokenApi.connect(undefined, "Unable to get key", 'GET');
  }
}

const postMessage = (ref, messengerApi) => (message) => {
  const isSent = messengerApi.send(message);
  const _print = print(ref);
  if(isSent) {
    _print(NoSSRChatMessageBoxProps.SENDER)(message);
  }
  else {
    _print(NoSSRChatMessageBoxProps.SYSTEM)(`[FailToSend]-${message}`);
  }
}

const getConnectionStatusText = (messengerApi) => () => {
  return (messengerApi.isConnected() ? "Disconnect" : "Connect")
}

const handleSubmit = (ref, messengerApi) => (event, value) => {
  event.preventDefault();
  postMessage(ref, messengerApi)(value);
}

const handleSuggestions = (_value) => {
  const results = allowedCalls;
  const value = _value.trim().toLowerCase();
  const match = results.find(result => result.indexOf(value) === 0) ;
  return match ? [match]: [];
}

const Manipulator = ({tokenApi, messengerApi}) => {
  const _chatMessageBoxRef = React.useRef();
  const _handleSubmit = handleSubmit(_chatMessageBoxRef, messengerApi);
  const _handleSuggestions = handleSuggestions;
  const _printSystem = print(_chatMessageBoxRef)(NoSSRChatMessageBoxProps.SYSTEM);
  const _printEvent = print(_chatMessageBoxRef)(NoSSRChatMessageBoxProps.OTHERS);

  const [connectionStatus, changeConnectionStatus] = React.useState(enumStatus.COMPLETE);

  React.useEffect(() => {
    switch(connectionStatus) {
      case enumStatus.INIT:
        changeConnectionStatus(enumStatus.INIT_TOKEN);
        break;
      case enumStatus.INIT_TOKEN:
        if(!tokenApi.isLoading && Object.keys(tokenApi.success).length !== 0) {
          changeConnectionStatus(enumStatus.INIT_CONNECT);
        }
        else if(!tokenApi.isLoading) {
          getToken(tokenApi);
        }
        else if(tokenApi.isError){
          _printSystem("Token retrieval failed.");
          changeConnectionStatus(enumStatus.COMPLETE);
        }
        break;
      case enumStatus.INIT_CONNECT:
        if(messengerApi.connectionStatus === EnumConnection.Disconnected) {
          messengerApi.connect(_printSystem, _printEvent);
        }
        else {
          changeConnectionStatus(enumStatus.COMPLETE);
        }
        break;
      case enumStatus.INIT_DISCONNECT:
        switch(messengerApi.connectionStatus) {
          case EnumConnection.Disconnected:
          case EnumConnection.Error:
            changeConnectionStatus(enumStatus.COMPLETE);
            break;
          case EnumConnection.Connected:
            messengerApi.disconnect();
            break;
        }
        break;
      default:
    }
  }, [tokenApi.isLoading, connectionStatus, messengerApi.connectionStatus]);

  function _renderInput() {
    return (
      <div className={"container"}>
        <table>
          <thead>
            <tr>
              <th>Code</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                {
                  (tokenApi && !tokenApi.isLoading && tokenApi.success) ?
                  tokenApi.success.codegen:"N/A"
                }
              </td>
              <td>
                <TextMessenger
                  maxLength={100}
                  onBlurCallback={()=>{}}
                  onSubmitCallback={_handleSubmit}
                  filterSuggestion={_handleSuggestions}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <style jsx>{`
          .container {
            display: flex;
            position: relative;
            justify-content: center;
            width: 100%;
          }
        `}</style>
      </div>
    );
  }

  function _renderLoading() {
    return (
      <div className={"container"}>
        <Loader/>
        <style jsx>{`
          .container {
            display: flex;
            position: relative;
            justify-content: center;
            width: 100%;
            margin-top: 3rem;
          }
        `}</style>
      </div>
    );
  }

  function _renderConnection() {
    const _connectionStatus = connectionStatus;
    switch(_connectionStatus) {
      case enumStatus.COMPLETE:
        switch(messengerApi.connectionStatus) {
          case EnumConnection.Connected:
            return _renderInput();
          case EnumConnection.StartConnecting:
            return _renderLoading();
          default:
            return <></>;
        }
      default:
        return _renderLoading();
    }
  }

  function _triggerConnection() {
    if(!messengerApi.isConnected()) {
      changeConnectionStatus(enumStatus.INIT);
    }
    else {
      changeConnectionStatus(enumStatus.INIT_DISCONNECT);
    }
  }

  function _renderButton() {
    switch(connectionStatus) {
      case enumStatus.COMPLETE:
        return(
          <Button onClickCallback={_triggerConnection} small={true}>
            {getConnectionStatusText(messengerApi)()}
          </Button>
        )
      default:
        return (<></>);
    }
  }

  return (
    <React.Fragment>
      <HtmlHead
        title="Manipulator Walcron"
        description="Connecting Mobile with Web."
        />
      <CommandBar/>
      <div className={'container'}>
        <HeaderOne title={"Connecting Reality"} isLined={true}/>
        <NoSSR>
          <div className={'textareaContainer'}>
            <NoSSRChatMessageBox ref={_chatMessageBoxRef}/>
          </div>
          <div className={"textmessengerContainer"}>
            {_renderConnection()}
          </div>
          <div className={"buttonContainer"}>
            {_renderButton()}
          </div>
        </NoSSR>
      </div>
      <Footer/>
      <style jsx>{`
        .container {
          margin: auto;
          padding-top: 10vh;
          min-height: 90vh;
        }
        .buttonContainer {
          max-width: 300px;
          display: flex;
          justify-content: space-evenly;
          padding-top: 1rem;
          padding-bottom: 1rem;
          margin: auto;
        }
        .textmessengerContainer {
        }
        .textareaContainer {
          margin: 2rem auto;
        }
      `}</style>
      <script src="https://js.pusher.com/5.0/pusher.min.js"></script>
    </React.Fragment>
  )

}

const mapTokenApi = (result) => ({tokenApi: result});
const mapMessengerApi = (result) => ({messengerApi: result});

export default compose(
  withConnectivity(mapTokenApi, {})("/api/manipulator"),
  withMessenger(mapMessengerApi)
)(Manipulator);
