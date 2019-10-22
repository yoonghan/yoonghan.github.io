import * as React from "react";
import Head from 'next/head';
import PusherJS from 'pusher-js';
import NoSSR from 'react-no-ssr';
import { HtmlHead } from '../components/HtmlHead';
import HeaderOne from "../components/HeaderOne";
import { PUSHER } from "../shared/const";

interface ManipulatorState {
}

class Manipulator extends React.PureComponent<{}, ManipulatorState> {
  // private static pushChannelServer = new Pusher({
  //   appId: process.env.PUSHER_APP_ID,
  //   key: process.env.PUSHER_APP_KEY,
  //   secret: process.env.PUSHER_APP_SECRET,
  //   cluster: process.env.PUSHER_CLUSTER,
  //   encrypted: true
  // });
  private pushChannelClient:any;

  constructor(props:any) {
    super(props);
  }

  componentDidMount() {
    if(process && process.env.PUSHER_APP_KEY) {
      const {
        PUSHER_APP_KEY,
        PUSHER_CLUSTER
      } = process.env;

      this.pushChannelClient = new PusherJS(PUSHER_APP_KEY, {
        cluster: PUSHER_CLUSTER,
        encrypted: true
      });
    }
  }

  _triggerServerClick = () => {

  }

  _triggerClick = () => {
    console.log("Trigger Click");
    var channel = this.pushChannelClient.subscribe(`${PUSHER.channel}`);
    channel.bind(PUSHER.event, function(data:any) {

      console.log("Subscription suceeded");

      // channel.trigger('client-someeventname',
      //   {
      //     "trolling": "data"
      //   }
      // );

      console.log(JSON.stringify(data));
    });
    channel.bind('pusher:subscription_error', function(status:number) {
      console.log(`Failed ${status}`)
    });
    console.log("Trigger Click");
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
        <div className={"container"}>
          <HeaderOne title={"Mobile Connectivity"} isLined={true}/>
          <NoSSR>
            <button onClick={this._triggerClick} value="Trigger Client">Trigger Client</button>
            <button onClick={this._triggerServerClick} value="Trigger Server">Trigger Server</button>
          </NoSSR>
        </div>
      </React.Fragment>
    )
  }
}

export default Manipulator;
