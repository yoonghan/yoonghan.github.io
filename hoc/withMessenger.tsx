import * as React from "react";
import PusherJS, {Pusher, Channel} from 'pusher-js';
import produce, {Draft} from "immer";
import { PUSHER } from "../shared/const";

export enum EnumConnection {
  StartConnecting,
  StartDisconnecting,
  Connected,
  Disconnected
}

export enum EnumMessengerEventType {
  CONNECTION,
  EVENT
}

interface IState {
  connectionStatus: EnumConnection;
  printConnectionCallback:(message:string)=>void;
  printEventCallback:(message:string)=>void
}

export interface IWithMessenger {
  connect: (printConnectionCallback:(message:string)=>void, printEventCallback:(message:string)=>void) => void;
  isConnected: ()=>boolean;
  disconnect: ()=>void;
}

const withMessenger = (result: any) => <T extends React.Component, OriginalProps extends {}>(Component: React.ComponentClass<OriginalProps>) => {

  type PrivateProps = {forwardedRef: React.RefObject<T>}
  type Props = OriginalProps & PrivateProps;

  class Messenger extends React.Component<Props, IState> {

    private pushChannelClient:Pusher|undefined;
    private channel:Channel|undefined;

    constructor(props:Props) {
      super(props);
      this.pushChannelClient = undefined;
      this.channel = undefined;
      this.state = {
        connectionStatus: EnumConnection.Disconnected,
        printConnectionCallback: ()=>{},
        printEventCallback: ()=>{}
      }
    }

    _disconnect = () => {
      if(this.pushChannelClient) {
        this.setState(
          produce(this.state, (draft) => {
            draft.connectionStatus = EnumConnection.StartDisconnecting;
          })
        );
        this.pushChannelClient.disconnect();
      }
    }

    _subscribeToChannel = (printCallback:(msg:string)=>void) => {
      if(typeof this.pushChannelClient !== 'undefined' &&
          typeof this.channel === 'undefined') {
        this.channel = this.pushChannelClient.subscribe(`private-${PUSHER.channel}`);
        this.channel.bind(`client-${PUSHER.event}`, (data:any) => {
          console.log(JSON.stringify(data));
          printCallback(data.message);
        });
      }
    }

    _monitorConnected = (printCallback:(msg:string)=>void) => {
      if(this.pushChannelClient) {
        this.pushChannelClient.connection.bind('connected', ({}) => {
          this.setState(
            produce(this.state, (draft) => {
              draft.connectionStatus = EnumConnection.Connected;
              printCallback("Connected");
            })
          );
        });
      }
    }

    _monitorError = (printCallback:(msg:string)=>void) => {
      if(this.pushChannelClient) {
        this.pushChannelClient.connection.bind('error', (error:any) => {
          console.warn(error, "Connection error");
          this.setState(
            produce(this.state, (draft:Draft<IState>) => {
              draft.connectionStatus = EnumConnection.Disconnected;
              printCallback("Interruption error encountered");
            })
          );
        });
      }
    }

    _monitorDisconnected = (printCallback:(msg:string)=>void) => {
      if(this.pushChannelClient) {
        this.pushChannelClient.connection.bind('disconnected', () => {
          this.setState(
            produce(this.state, (draft) => {
              draft.connectionStatus = EnumConnection.Disconnected;
              printCallback("Disconnected");
            })
          );
          this.pushChannelClient = undefined;
          this.channel = undefined;
        });
      }
    }

    _postMessage = (message:string) => {
      if(this.channel) {
        const isSent = this.channel.trigger(`client-${PUSHER.event}`, {
          message: message
        });
        return isSent;
      }
      return false;
    }

    _connect = (printConnectionCallback:(message:string)=>void, printEventCallback:(message:string)=>void) => {
      this.setState(
        produce(this.state, (draft) => {
          draft.connectionStatus = EnumConnection.StartConnecting;
          draft.printConnectionCallback = printConnectionCallback;
          draft.printEventCallback = printEventCallback;
        })
      );
    }

    _isConnected = () => {
      const {connectionStatus} = this.state;
      return connectionStatus === EnumConnection.Connected;
    }

    _postConnect = (prevState:IState) => {

      const {connectionStatus, printConnectionCallback, printEventCallback} = this.state;

      if(
        prevState.connectionStatus !== this.state.connectionStatus &&
        connectionStatus === EnumConnection.StartConnecting
      ) {
        printConnectionCallback("Establishing Connection");
        if(!this.pushChannelClient && process && process.env.PUSHER_APP_KEY) {
          const {
            PUSHER_APP_KEY,
            PUSHER_CLUSTER
          } = process.env;

          this.pushChannelClient = new PusherJS(PUSHER_APP_KEY, {
            cluster: PUSHER_CLUSTER,
            authEndpoint: PUSHER.endpoint
          });

          this._subscribeToChannel(printEventCallback);
          this._monitorConnected(printConnectionCallback);
          this._monitorError(printConnectionCallback);
          this._monitorDisconnected(printConnectionCallback);
        }
      }
    }

    componentDidUpdate({}, prevState:IState) {
      this._postConnect(prevState);
    }

    render() {
      const {forwardedRef, ...otherProps} = this.props as PrivateProps;
      const componentProps = otherProps as OriginalProps;
      const responseWithMessenger = {
        connect: this._connect,
        send: this._postMessage,
        disconnect: this._disconnect,
        isConnected: this._isConnected,
        connectionStatus: this.state.connectionStatus
      }
      const response = result(responseWithMessenger);

      return (
        <Component
          {...componentProps}
          {...response}
          ref={forwardedRef}/>
        ) //spreading
    }

  }

  const RefForwardingFactory = (props: Props, ref: any) => {return <Messenger {...props} forwardedRef={ref}/>};

  return React.forwardRef<T, OriginalProps>(RefForwardingFactory as any);
}

export default withMessenger;
