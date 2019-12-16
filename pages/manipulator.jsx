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

class Manipulator extends React.Component {
  constructor(props) {
    super(props);
    this.allowedCalls = ["up", "down", "left", "right"];
    this.chatMessageBoxRef = React.createRef();
  }

  _print = (sender) => (message) => {
    this.chatMessageBoxRef.current.addMessage(
      sender,
      message);
  }

  _getToken = () => {
    const {tokenApi} = this.props;
    if(!tokenApi.isLoading) {
      tokenApi.connect(undefined, "Unable to get key", 'GET');
    }
  }


  _postMessage = (message) => {
    const isSent = this.props.messengerApi.send(message);
    if(isSent) {
      this._print(NoSSRChatMessageBoxProps.SENDER)(message);
    }
    else {
      this._print(NoSSRChatMessageBoxProps.SYSTEM)(`[FailToSend]-${message}`);
    }
  }

  _triggerConnection = () => {
    const {isConnected, disconnect} = this.props.messengerApi;
    if(isConnected()) {
      disconnect();
    }
    else {
      this._getToken();
    }
  }

  _getConnectionStatusText = () => {
    const isConnected = this.props.messengerApi.isConnected();
    return (isConnected ? "Disconnect" : "Connect")
  }

  _handleSubmit = (event, value) => {
    event.preventDefault();
    this._postMessage(value);
  }

  _handleSuggestions = (_value) => {
    const results = this.allowedCalls;
    const value = _value.trim().toLowerCase();
    const match = results.find(result => result.indexOf(value) === 0) ;
    return match ? [match]: [];
  }

  _renderInput = () => {
    const {tokenApi} = this.props;
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
                  onSubmitCallback={this._handleSubmit}
                  filterSuggestion={this._handleSuggestions}
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

  _renderLoading = () => (
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

  )

  _renderConnection = () => {
    const {connectionStatus} = this.props.messengerApi;
    switch(connectionStatus) {
      case EnumConnection.Connected:
        return this._renderInput();
      case EnumConnection.StartConnecting:
        return this._renderLoading();
      default:
        return <></>;
    }
  }

  _renderButton = () => {
    switch(this.props.messengerApi.connectionStatus) {
      case EnumConnection.StartConnecting:
      case EnumConnection.StartDisconnecting:
        return (<></>);
      default:
        return (
          <Button onClickCallback={this._triggerConnection} small={true}>
            {this._getConnectionStatusText()}
          </Button>
        )
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const {tokenApi, messengerApi} = this.props;
    if(prevProps.tokenApi.isLoading && !tokenApi.isLoading) {
      if(Object.keys(tokenApi.success).length !== 0) {
        const printConnection = this._print(NoSSRChatMessageBoxProps.OTHERS);
        const printEvent = this._print(NoSSRChatMessageBoxProps.SYSTEM);
        messengerApi.connect(printEvent, printConnection);
      }
      else if(tokenApi.isError) {
        this._print(NoSSRChatMessageBoxProps.SYSTEM)("Token retrieval failed.");
        messengerApi.disconnect();
      }
    }
  }

  render() {
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
              <NoSSRChatMessageBox ref={this.chatMessageBoxRef}/>
            </div>
            <div className={"textmessengerContainer"}>
              {this._renderConnection()}
            </div>
            <div className={"buttonContainer"}>
              {this._renderButton()}
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
}

const mapTokenApi = (result) => ({tokenApi: result});
const mapMessengerApi = (result) => ({messengerApi: result});

export default compose(
  withConnectivity(mapTokenApi, {})("/api/manipulator"),
  withMessenger(mapMessengerApi)
)(Manipulator);
