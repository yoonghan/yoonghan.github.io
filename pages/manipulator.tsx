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

  componentDidMount() {
    if(process && process.env.PUSHER_APP_KEY) {
      const {
        PUSHER_APP_KEY,
        PUSHER_CLUSTER
      } = process.env;
      const self = this;

      this.pushChannelClient = new PusherJS(PUSHER_APP_KEY, {
        cluster: PUSHER_CLUSTER,
        forceTLS: true
      });
      this.pushChannelClient.connection.bind('error', function(error:string) {
        console.error(error, "Connection error");
        self.setState(
          produce((draft: Draft<ManipulatorStates>) => {
            draft.isConnected = false;
          })
        );
      });
      this.pushChannelClient.connection.bind('disconnected', function() {
        self.setState(
          produce((draft: Draft<ManipulatorStates>) => {
            draft.isConnected = false;
          })
        );
      });
    }
  }

  _disconnect = () => {
    console.log("Disconnecting", "Pusher Connection");
    this.pushChannelClient.disconnect();
  }

  _connect = () => {
    console.log("Connecting", "Pusher Connection");
    var channel = this.pushChannelClient.subscribe(`${PUSHER.channel}`);
    const self = this;
    channel.bind(PUSHER.event, function(data:any) {
      self.setState(
        produce((draft: Draft<ManipulatorStates>) => {
          draft.textInfo += "\n" + data;
        })
      );
      console.log(JSON.stringify(data));
    });
    self.setState(
      produce((draft: Draft<ManipulatorStates>) => {
        draft.isConnected = true;
      })
    );
  }

  _triggerConnection = () => {
    console.log("=========", "Pusher Connection");
    const {isConnected} = this.state;
    if(isConnected) {
      this._disconnect();
    }
    else {
      this._connect();
    }
    console.log("=========", "Pusher Connection");
  }

  _getConnectionStatusText = () => {
    const {isConnected} = this.state;
    return (isConnected ? "Disconnect" : "Connect")
  }

  render() {
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
              <Textarea cols={10} rows={10} text={""}/>
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
