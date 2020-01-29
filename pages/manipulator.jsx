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
import { compose } from 'redux';
import withConnectivity, { IWithConnectivity } from "../hoc/withConnectivity";
import withMessenger, { IWithMessenger, EnumConnection } from "../hoc/withMessenger";
import Loader, {LOADER_ID_NAME} from "../components/Loader";
import NoSSRChatMessageBox, {NoSSRChatMessageBoxProps} from "../components/NoSSRChatMessageBox";

const allowedCalls = ["up", "down", "left", "right"];
const enumStatus = {
  INIT: 1,
  INIT_TOKEN: 2,
  INIT_CONNECT: 3,
  COMPLETE: 4,
  INIT_DISCONNECT: 5
}

var notificationAllowed = false;

const printOtherMessage = (ref, sender, isNotification) => (message) => {
  ref.current.addMessage(
    sender,
    message);
  if (isNotification && notificationAllowed) {
    const notification = new Notification('New Message', { body: message });
    setTimeout(()=>{notification.close()}, 2000);
  }
}

const printMessage = (ref, sender) => (message) => {
  ref.current.addMessage(
    sender,
    message);
}

const printError = (message) => {
  console.error("Can't print, no ref found");
}

/* Functions */
const print = (ref) => (sender) => {
  if(ref && ref.current) {
    if(sender === NoSSRChatMessageBoxProps.OTHERS) {
      return printOtherMessage(ref, sender, (window.Notification && Notification.permission === "granted"));
    }
    else {
      return printMessage(ref, sender);
    }
  }
  return printError;
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

const requestNotificationPermission = () => {
  if (window.Notification && Notification.permission !== "granted") {
    Notification.requestPermission(function (status) {
      if (Notification.permission !== status) {
        Notification.permission = status;
      }
    });
  }
}

const handleFocus = () => {
  notificationAllowed = false;
}

const handleBlur = () => {
  notificationAllowed = true;
}

const renderLoading = () => {
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

const loaderComponent = renderLoading();

const Manipulator = ({tokenApi, messengerApi}) => {
  const _chatMessageBoxRef = React.useRef();
  const _handleSubmit = handleSubmit(_chatMessageBoxRef, messengerApi);
  const _handleSuggestions = handleSuggestions;
  const _printSystem = print(_chatMessageBoxRef)(NoSSRChatMessageBoxProps.SYSTEM);
  const _printEvent = print(_chatMessageBoxRef)(NoSSRChatMessageBoxProps.OTHERS);

  const [connectionStatus, changeConnectionStatus] = React.useState(enumStatus.COMPLETE);
  const [tokenCodegenAsChannelId, changeTokenCodeGen] = React.useState("");
  const [hideLoading, changeHideLoading] = React.useState(true);

  React.useEffect(() => {
    if(!tokenApi.isLoading && Object.keys(tokenApi.success).length !== 0) {
      changeTokenCodeGen(tokenApi.success.codegen);
      changeConnectionStatus(enumStatus.INIT_CONNECT);
    }
    else if(tokenApi.isError){
      _printSystem("Token retrieval failed.");
      changeConnectionStatus(enumStatus.COMPLETE);
    }
    else if(tokenApi.isLoading) {
      _printSystem("Retrieving token");
    }
  },[tokenApi.isLoading]);

  React.useEffect(() => {
    switch(connectionStatus) {
      case enumStatus.INIT:
        changeConnectionStatus(enumStatus.INIT_TOKEN);
        break;
      case enumStatus.INIT_TOKEN:
        getToken(tokenApi);
        break;
      case enumStatus.INIT_CONNECT:
        switch(messengerApi.connectionStatus) {
          case EnumConnection.Disconnected:
            if(typeof tokenCodegenAsChannelId !== "undefined") {
                messengerApi.connect(tokenCodegenAsChannelId, _printSystem, _printEvent);
            }
            else {
              changeConnectionStatus(enumStatus.COMPLETE);
            }
            break;
          case EnumConnection.Connected:
          case EnumConnection.Error:
            changeConnectionStatus(enumStatus.COMPLETE);
            break;
          default:
        }
        break;
      case enumStatus.INIT_DISCONNECT:
        switch(messengerApi.connectionStatus) {
          case EnumConnection.Connected:
            messengerApi.disconnect();
            break;
          case EnumConnection.Disconnected:
          case EnumConnection.Error:
            changeConnectionStatus(enumStatus.COMPLETE);
            break;
          default:
        }
        break;
      case enumStatus.COMPLETE:
        requestNotificationPermission();
        break;
      default:
    }
  }, [connectionStatus, messengerApi.connectionStatus]);

  function _renderInput() {
    return (
      <div className={"container"}>
        <table>
          <thead>
            <tr>
              <th>Code</th>
              <th>Message<br/>
                <span className={"ext_msg"}>
                  [Supports file dragging]
                </span>
              </th>
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
                  onFocusCallback={handleFocus}
                  onBlurCallback={handleBlur}
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
          .container table tr td {
            padding: 0 0.5em;
          }
          .ext_msg {
            font-size: 0.7em;
          }
        `}</style>
      </div>
    );
  }

  function _renderConnection() {
    const _connectionStatus = connectionStatus;
    switch(_connectionStatus) {
      case enumStatus.COMPLETE:
        _controlLoader(false);
        switch(messengerApi.connectionStatus) {
          case EnumConnection.Connected:
            return _renderInput();
          default:
            return <></>;
        }
      default:
        _controlLoader(true);
    }
  }

  function _controlLoader(isShown) {
    if(_chatMessageBoxRef && _chatMessageBoxRef.current) {
      const style = (isShown?'block':'none');
      (document).getElementById(LOADER_ID_NAME).style.display=style;
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
            {loaderComponent}
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
