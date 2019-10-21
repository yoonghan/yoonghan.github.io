import * as React from "react";
import Head from 'next/head';
import Pusher from 'pusher';
import { HtmlHead } from '../components/HtmlHead';
import HeaderOne from "../components/HeaderOne";
import { PUSHER } from "../shared/const";

interface ManipulatorState {
}

class Manipulator extends React.PureComponent<{}, ManipulatorState> {

  private static channelClient = new Pusher({
    appId: '883986',
    key: 'e9139e70efa074139d48',
    secret: 'd3fa184f6689ae235725',
    cluster: 'ap1',
    encrypted: true
  });

  constructor(props:any) {
    super(props);
  }

  _triggerClick = () => {
    console.log("Trigger Click");
    Manipulator.channelClient.trigger(PUSHER.channel, PUSHER.event, {
      "message": "hello world"
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
          <button onClick={this._triggerClick}/>
        </div>
      </React.Fragment>
    )
  }
}

export default Manipulator;
