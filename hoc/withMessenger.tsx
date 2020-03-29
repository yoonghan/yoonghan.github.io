import * as React from "react";
import PusherJS, {Pusher, Channel} from 'pusher-js';
import produce, {Draft} from "immer";
import { PUSHER } from "../shared/const";

export enum EnumConnection {
  StartConnecting,
  StartDisconnecting,
  Connected,
  Disconnected,
  Error
}

export enum EnumMessengerEventType {
  CONNECTION,
  EVENT
}

interface IState {
  channelName: string;
  connectionStatus: EnumConnection;
  printConnectionCallback:(message:string)=>void;
  printEventCallback:(message:string)=>void
}

export interface IWithMessenger {
  connect: (token: string, printConnectionCallback:(message:string)=>void, printEventCallback:(message:string)=>void) => void;
  isConnected: ()=>boolean;
  disconnect: ()=>void;
}

const withMessenger = (result: any, nonprivate=false) => <T extends React.Component, OriginalProps extends {}>(Component: React.ComponentClass<OriginalProps>) => {

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
        channelName: "",
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

    _subscribeToChannel = (channelName:string, printCallback:(msg:string)=>void) => {
      if(typeof this.pushChannelClient !== 'undefined' &&
          typeof this.channel === 'undefined') {
        const _channelName = nonprivate? channelName: `private-${channelName}`;
        const _event = nonprivate? PUSHER.event: `client-${PUSHER.event}`;
        this.channel = this.pushChannelClient.subscribe(_channelName);
        this.channel.bind(_event, (data:any) => {
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

    _monitorFail = (printCallback:(msg:string)=>void) => {
      if(this.pushChannelClient) {
        this.pushChannelClient.connection.bind('failed', ({}) => {
          this.setState(
            produce(this.state, (draft:Draft<IState>) => {
              draft.connectionStatus = EnumConnection.Disconnected;
              printCallback("Connection failed as websocket is not supported by browser");
            })
          );
          this.pushChannelClient = undefined;
          this.channel = undefined;
        });
      }
    }

    _monitorError = (printCallback:(msg:string)=>void) => {
      if(this.pushChannelClient) {
        this.pushChannelClient.connection.bind('error', (error:any) => {
          console.warn(error, "Connection error");
          if(error.type === "WebSocketError" && error.error.data.code !== 1006) {
              printCallback("A different Id was requested, please refresh the page.");
              this.setState(
                produce(this.state, (draft:Draft<IState>) => {
                  draft.connectionStatus = EnumConnection.Disconnected;
                  this.pushChannelClient = undefined;
                  this.channel = undefined;
                  printCallback("Interruption error encountered");
                })
              );
          }
          else {
            this.setState(
              produce(this.state, (draft:Draft<IState>) => {
                draft.connectionStatus = EnumConnection.Error;
                printCallback("Interruption error encountered");
              })
            );
          }
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
        const _event = nonprivate? PUSHER.event: `client-${PUSHER.event}`;
        const isSent = this.channel.trigger(_event, {
          message: message
        });
        return isSent;
      }
      return false;
    }

    _connect = (channelName:string, printConnectionCallback:(message:string)=>void, printEventCallback:(message:string)=>void) => {
      this.setState(
        produce(this.state, (draft) => {
          draft.channelName = `${PUSHER.channel_prefix}${channelName}`;
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
          this.pushChannelClient = nonprivate ?
            new PusherJS(PUSHER_APP_KEY, {
            cluster: PUSHER_CLUSTER,
            enabledTransports: ["sockjs", "ws"]
            })
            :new PusherJS(PUSHER_APP_KEY, {
              cluster: PUSHER_CLUSTER,
              authEndpoint: PUSHER.endpoint,
              enabledTransports: ["sockjs", "ws"]
            });

          this._subscribeToChannel(this.state.channelName, printEventCallback);
          this._monitorConnected(printConnectionCallback);
          this._monitorError(printConnectionCallback);
          this._monitorDisconnected(printConnectionCallback);
          this._monitorFail(printConnectionCallback);
        }
        else {
          printConnectionCallback("Configuration error. Please inform administrator.");
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
