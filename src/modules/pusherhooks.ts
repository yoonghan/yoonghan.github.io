import {useState, useEffect} from "react";
import PusherJS from 'pusher-js';
import { PUSHER } from "../shared/const";

export enum EnumConnection {
  StartConnecting = "Start Connecting",
  StartDisconnecting = "Start Disconnecting",
  Connected = "Connected",
  Disconnected = "Disconnected",
  Error = "Error"
}

/** Updated using hook for better management **/

export function withPusher (
  _channelName:string,
  printConnectionCallback:(message:string) => void,
  printEventCallback:(message:string) => void,
  appKey:string, cluster:string, nonprivate=false, authEndpoint?: string) {

  let pushChannelClient:any|undefined = undefined;
  let channel:any|undefined = undefined;

  const channelName = `${PUSHER.channel_prefix}${_channelName}`;
  const eventName = nonprivate? PUSHER.event: `client-${PUSHER.event}`;

  const [pusher, setPusher] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState(EnumConnection.Disconnected);

  useEffect(() => {
    switch(connectionStatus) {
      case EnumConnection.StartConnecting:
        printConnectionCallback("Establishing Connection");

        if(!pushChannelClient) {
          const pusherConfiguration = {cluster, enabledTransports: ["sockjs", "ws"]};
          if(authEndpoint) {
            pusherConfiguration["authEndpoint"] = authEndpoint;
          }
          pushChannelClient =
            new PusherJS(appKey, pusherConfiguration);

          if(pushChannelClient) {
            _subscribeToChannel();
            _monitorConnected(printConnectionCallback);
            _monitorError(printConnectionCallback);
            _monitorDisconnected(printConnectionCallback);
            _monitorFail(printConnectionCallback);
          }
        }
        else {
          printConnectionCallback("Configuration error. Please inform administrator.");
        }
        break;
      default:
        printConnectionCallback("Changed Status:"+connectionStatus);
        break;
    }
  }, [connectionStatus]);

  const _subscribeToChannel = () => {
    const _channelName = nonprivate? channelName: `private-${channelName}`;
    channel = pushChannelClient.subscribe(_channelName);
    channel.bind(eventName, (data:any) => {
      printEventCallback(data.message);
    });
  }

  const _monitorConnected = () => {
    pushChannelClient.connection.bind('connected', ({}) => {
      setConnectionStatus(EnumConnection.Connected);
      printConnectionCallback("Connected");
    });
  }

  const _monitorFail = () => {
    pushChannelClient.connection.bind('failed', ({}) => {
      setConnectionStatus(EnumConnection.Disconnected);
      printConnectionCallback("Connection failed as websocket is not supported by browser");
      pushChannelClient = undefined;
      channel = undefined;
    });
  }

  const _monitorError = () => {
    pushChannelClient.connection.bind('error', (error:any) => {
      console.warn(error, "Connection error");
      if(error.type === "WebSocketError" && error.error.data.code !== 1006) {
          printConnectionCallback("A different Id was requested, please refresh the page.");
          setConnectionStatus(EnumConnection.Disconnected);
          pushChannelClient = undefined;
          channel = undefined;
          printConnectionCallback("Interruption error encountered");
      }
      else {
        setConnectionStatus(EnumConnection.Error);
        printConnectionCallback("Interruption error encountered");
      }
    });
  }

  const _monitorDisconnected = () => {
    pushChannelClient.connection.bind('disconnected', () => {
      setConnectionStatus(EnumConnection.Disconnected);
      printConnectionCallback("Disconnected");
      pushChannelClient = undefined;
      channel = undefined;
    });
  }

  const _connect = () => {
    setConnectionStatus(EnumConnection.StartConnecting);
  }

  const _postMessage = (message:string) => {
    if(channel) {
      const isSent = channel.trigger(eventName, {
        message: message
      });
      return isSent;
    }
    return false;
  }

  const _disconnect = () => {
    if(pushChannelClient) {
      setConnectionStatus(EnumConnection.StartDisconnecting);
      pushChannelClient.disconnect();
    }
  }

  const _isConnected = () => {
    return connectionStatus === EnumConnection.Connected;
  }

  return {
    connect: _connect,
    send: _postMessage,
    disconnect: _disconnect,
    isConnected: _isConnected,
    connectionStatus: connectionStatus
  }
}
