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
import Textarea from "../components/Textarea";

interface ManipulatorStates {
  textInfo: string;
  isConnected: boolean;
}

class Manipulator extends React.PureComponent<{}, ManipulatorStates> {
  private pushChannelClient:any;

  constructor(props:any) {
    super(props);
    this.state = {
      isConnected: false,
      textInfo: ""
    }
  }

  _print = (message: string) => {
    return `> ${message} \n`;
  }

  _disconnect = () => {
    if(this.pushChannelClient) {
      this.pushChannelClient.disconnect();
    }
  }

  _subscribeToChannel = () => {
    this.pushChannelClient.subscribe(`${PUSHER.channel}`).bind(PUSHER.event, (data:any) => {
      this.setState(
        produce((draft: Draft<ManipulatorStates>) => {
          draft.textInfo += "\n" + data;
        })
      );
      console.log(JSON.stringify(data));
    });
  }

  _monitorConnected = () => {
    this.pushChannelClient.connection.bind('connected', (error:string) => {
      console.log(error, "Connected");
      this.setState(
        produce((draft: Draft<ManipulatorStates>) => {
          draft.isConnected = true;
          draft.textInfo += this._print("connected");
        })
      );
    });
  }

  _monitorError = () => {
    this.pushChannelClient.connection.bind('error', (error:string) => {
      console.error(error, "Connection error");
      this.setState(
        produce((draft: Draft<ManipulatorStates>) => {
          draft.isConnected = false;
          draft.textInfo += this._print("error encountered: " + error);
        })
      );
    });
  }

  _monitorDisconnected = () => {
    this.pushChannelClient.connection.bind('disconnected', () => {
      this.setState(
        produce((draft: Draft<ManipulatorStates>) => {
          draft.isConnected = false;
          draft.textInfo += this._print("disconnected");
        })
      );
      this.pushChannelClient = undefined;
    });
  }

  _connect = () => {
    console.log("Connecting", "Pusher Connection");
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

  _triggerConnection = () => {
    const {isConnected} = this.state;
    if(isConnected) {
      this._disconnect();
    }
    else {
      this._connect();
    }
  }

  _getConnectionStatusText = () => {
    const {isConnected} = this.state;
    return (isConnected ? "Disconnect" : "Connect")
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
            <div className={'buttonContainer'}>
              <Button onClickCallback={this._triggerConnection} small={true}>
                {this._getConnectionStatusText()}
              </Button>
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
          .textareaContainer {
            margin: 2rem auto;
          }
        `}</style>
      </React.Fragment>
    )
  }
}

export default Manipulator;
