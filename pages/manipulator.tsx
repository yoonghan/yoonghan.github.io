import * as React from "react";
import Head from 'next/head';
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
import { compose } from 'redux'
import withConnectivity, { IWithConnectivity } from "../hoc/withConnectivity";
import Loader from "../components/Loader";

interface IGetTokenResponse {
  codegen?: string
}

interface IPostMessagingResponse {
  status?: string
}

enum EnumConnection {
    StartConnecting,
    StartDisconnecting,
    Connected,
    Disconnected
}

interface IManipulatorStates {
  textInfo: string;
  connectionStatus: EnumConnection;
}

interface IManipulatorProps {
  tokenApi: IWithConnectivity<IGetTokenResponse>;
  messagingApi: IWithConnectivity<IPostMessagingResponse>;
}

class Manipulator extends React.PureComponent<IManipulatorProps, IManipulatorStates> {
  private pushChannelClient:any;
  private allowedCalls = ["up", "down", "left", "right"];

  constructor(props:IManipulatorProps) {
    super(props);
    this.state = {
      connectionStatus: EnumConnection.Disconnected,
      textInfo: ""
    }
  }

  _print = (message: string) => {
    return `> ${message} \n`;
  }

  _disconnect = () => {
    if(this.pushChannelClient) {
      this.setState(
        produce((draft: Draft<IManipulatorStates>) => {
          draft.connectionStatus = EnumConnection.StartDisconnecting;
        })
      );
      this.pushChannelClient.disconnect();
    }
  }

  _subscribeToChannel = () => {
    this.pushChannelClient.subscribe(`${PUSHER.channel}`).bind(PUSHER.event, (data:any) => {
      this.setState(
        produce((draft: Draft<IManipulatorStates>) => {
          draft.textInfo += this._print("[Received:] " + data.message);
        })
      );
      console.log(JSON.stringify(data));
    });
  }

  _getToken = () => {
    const {tokenApi} = this.props;
    if(!tokenApi.isLoading) {
      tokenApi.connect(undefined, "Unable to get key", 'GET');
    }
  }

  _monitorConnected = () => {
    this.pushChannelClient.connection.bind('connected', (data:string) => {
      console.log(data, "Connected");
      this._getToken();
      this.setState(
        produce((draft: Draft<IManipulatorStates>) => {
          draft.connectionStatus = EnumConnection.Connected;
          draft.textInfo += this._print("connected");
        })
      );
    });
  }

  _monitorError = () => {
    this.pushChannelClient.connection.bind('error', (error:string) => {
      console.error(error, "Connection error");
      this.setState(
        produce((draft: Draft<IManipulatorStates>) => {
          draft.connectionStatus = EnumConnection.Disconnected;
          draft.textInfo += this._print("error encountered: " + JSON.stringify(error));
        })
      );
    });
  }

  _monitorDisconnected = () => {
    this.pushChannelClient.connection.bind('disconnected', () => {
      this.setState(
        produce((draft: Draft<IManipulatorStates>) => {
          draft.connectionStatus = EnumConnection.Disconnected;
          draft.textInfo += this._print("disconnected");
        })
      );
      this.pushChannelClient = undefined;
    });
  }

  _postMessage = (message:string) => {
    const {messagingApi, tokenApi} = this.props;
    if(!messagingApi.isLoading) {
      messagingApi.connect(
        {
          codegen: tokenApi.success.codegen,
          message: message
        },
         "Unable to get key", 'POST');
    }
  }

  _connect = () => {
    console.log("Connecting", "Pusher Connection");
    this.setState(
      produce((draft: Draft<IManipulatorStates>) => {
        draft.connectionStatus = EnumConnection.StartConnecting;
      })
    );
  }

  _triggerConnection = () => {
    const {connectionStatus} = this.state;
    if(connectionStatus === EnumConnection.Connected) {
      this._disconnect();
    }
    else {
      this._connect();
    }
  }

  _getConnectionStatusText = () => {
    const {connectionStatus} = this.state;
    return (connectionStatus === EnumConnection.Connected ? "Disconnect" : "Connect")
  }

  _handleSubmit = (event :React.FormEvent<HTMLFormElement>, value:string) => {
    event.preventDefault();
    this._postMessage(value);
  }

  _handleSuggestions = (_value: string) => {
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
    const {connectionStatus} = this.state;
    switch(connectionStatus) {
      case EnumConnection.Connected:
        return this._renderInput();
      case EnumConnection.StartConnecting:
        return this._renderLoading();
      default:
        return <></>;
    }
  }

  _connectWhenStartConnecting = (prevState:IManipulatorStates) => {
    if(
      prevState.connectionStatus !== this.state.connectionStatus &&
      this.state.connectionStatus === EnumConnection.StartConnecting
    ) {
      console.log("Start connection");
      if(!this.pushChannelClient && process && process.env.PUSHER_APP_KEY) {
        const {
          PUSHER_APP_KEY,
          PUSHER_CLUSTER
        } = process.env;

        this.pushChannelClient = new PusherJS(PUSHER_APP_KEY, {
          cluster: PUSHER_CLUSTER,
          forceTLS: true
        });

        this._subscribeToChannel();
        this._monitorConnected();
        this._monitorError();
        this._monitorDisconnected();
      }
    }
  }

  _renderButton = () => {
    switch(this.state.connectionStatus) {
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

  componentDidUpdate({}, prevState:IManipulatorStates) {
    this._connectWhenStartConnecting(prevState);
  }

  render() {
    const {textInfo} = this.state;

    return (
      <React.Fragment>
        <HtmlHead
          title="Manipulator Walcron"
          description="Connecting Mobile with Web."
          />
        <Head>
          <script src="https://js.pusher.com/5.0/pusher.min.js"></script>
        </Head>
        <CommandBar/>
        <div className={'container'}>
          <HeaderOne title={"Connecting Reality"} isLined={true}/>
          <NoSSR>
            <div className={'textareaContainer'}>
              <Textarea cols={10} rows={10} text={textInfo}/>
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
            padding-top: 100px;
          }
          .buttonContainer {
            max-width: 300px;
            display: flex;
            justify-content: space-evenly;
            padding-top: 1rem;
            padding-bottom: 10rem;
            margin: auto;
          }
          .textmessengerContainer {
          }
          .textareaContainer {
            margin: 2rem auto;
          }
        `}</style>
      </React.Fragment>
    )
  }
}

const mapTokenApi = (result:IGetTokenResponse) => ({tokenApi: result});
const mapMessagingApi = (result:IPostMessagingResponse) => ({messagingApi: result});

export default compose(
  withConnectivity(mapTokenApi, {})("/api/manipulator"),
  withConnectivity(mapMessagingApi, {})("/api/manipulator")
)(Manipulator);
