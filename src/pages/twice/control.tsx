import * as React from 'react';
import {withPusher} from "../../modules/pusherhooks";
import { GetServerSideProps } from 'next'

interface IControl {
  appKey: string;
  cluster: string;
  channelName: string;
}

const Control:React.SFC<IControl> = ({appKey, cluster, channelName}) => {
  const [messages, setMessages] = React.useState([]);
  const _print = (prefix) => (msg) => {
    setMessages(oldArray => [...oldArray, `${prefix}-${msg}`]);
  }
  const _printEvent = _print('s');
  const _printSystem = _print('e');
  const {connect, disconnect, isConnected} = withPusher(channelName, _printSystem, _printEvent, appKey, cluster, true);

  const _drawnMessages = () => {
    const elems = messages.map((elem, idx) => <li key={`msg-${idx}`}>{elem}</li>);
    return elems;
  };

  const _scheduleRetrieve = async () => {
    console.log("retrieve")
    setTimeout(() => {
      console.log(isConnected, 'isConnected');

      if(isConnected) {
        fetch('/api/locker/consumer', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          referrerPolicy: 'no-referrer',
          body: JSON.stringify({"groupid": "5"})
        })
        .then(
          ()=>{_scheduleRetrieve()}
        )

        ;

      }
    }, 30000);
  }

  React.useEffect(()=>{
    connect();
    _scheduleRetrieve();

    return disconnect;
  },[]);

  return (
    <div>
      <div>Message</div>
      <ul>{_drawnMessages()}</ul>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {
    TWICE_NONAUTH_APP_KEY,
    TWICE_CHANNEL_NAME,
    PUSHER_CLUSTER
  } = process.env;
  return {
    props: {
      appKey: TWICE_NONAUTH_APP_KEY,
      channelName: TWICE_CHANNEL_NAME,
      cluster: PUSHER_CLUSTER
    },
  }
}

export default Control;
