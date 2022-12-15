import { useState, useEffect, useRef, useDebugValue } from "react"
import PusherJS, { Channel } from "pusher-js"
import { PUSHER } from "../config"
import { Transport } from "pusher-js/types/src/core/config"

export enum EnumConnectionStatus {
  StartConnecting = "Start Connecting",
  Connected = "Connected",
  Disconnected = "Disconnected",
  Error = "Error",
}

type Props = {
  eventName: string
  channelName: string
  printConnectionCallback: (message: string) => void
  printEventCallback: (message: string, senderId?: number) => void
  appKey: string
  cluster: string
  nonprivate?: boolean
  authEndpoint?: string
}

export function usePusher(props: Props) {
  const { printConnectionCallback, printEventCallback, appKey, cluster } = props
  const pusherChannelClient = useRef<PusherJS>()
  const channel = useRef<Channel>()

  const prefixChannelName = `${PUSHER.channel_prefix}${props.channelName}`
  const channelName = props.nonprivate
    ? prefixChannelName
    : `private-${prefixChannelName}`
  const eventName = `client-${props.eventName}`

  const [connectionStatus, setConnectionStatus] = useState(
    EnumConnectionStatus.Disconnected
  )

  useDebugValue("connection:" + connectionStatus)

  useEffect(() => {
    printConnectionCallback("Changed Status: " + connectionStatus)
  }, [connectionStatus, printConnectionCallback])

  const subscribeToChannel = () => {
    if (pusherChannelClient.current) {
      channel.current = pusherChannelClient.current.subscribe(channelName)
      channel.current.bind(
        eventName,
        (data: { message: string; senderId?: number }) => {
          printEventCallback(data.message, data.senderId)
        }
      )
    }
  }

  const monitorConnection = () => {
    if (pusherChannelClient.current) {
      pusherChannelClient.current.connection.bind("connected", () => {
        setConnectionStatus(EnumConnectionStatus.Connected)
      })
    }
  }

  const monitorFail = () => {
    if (pusherChannelClient.current) {
      pusherChannelClient.current.connection.bind("failed", () => {
        setConnectionStatus(EnumConnectionStatus.Disconnected)
        printConnectionCallback(
          "Connection failed as websocket is not supported by browser"
        )
        pusherChannelClient.current = undefined
        channel.current = undefined
      })
    }
  }

  const monitorError = () => {
    if (pusherChannelClient.current) {
      pusherChannelClient.current.connection.bind("error", (error: any) => {
        if (
          error?.type === "WebSocketError" &&
          error?.error?.data?.code !== 1006
        ) {
          printConnectionCallback(
            "A different Id was requested, please refresh the page."
          )
          setConnectionStatus(EnumConnectionStatus.Disconnected)
          pusherChannelClient.current = undefined
          channel.current = undefined
        } else {
          // eslint-disable-next-line no-console
          console.error(error)
          setConnectionStatus(EnumConnectionStatus.Error)
          printConnectionCallback("Interruption error encountered")
        }
      })
    }
  }

  const monitorDisconnected = () => {
    if (pusherChannelClient.current) {
      pusherChannelClient.current.connection.bind("disconnected", () => {
        setConnectionStatus(EnumConnectionStatus.Disconnected)
        printConnectionCallback("Disconnected")
        pusherChannelClient.current = undefined
        channel.current = undefined
      })
    }
  }

  const connect = () => {
    if (pusherChannelClient.current) {
      printConnectionCallback("Connection is already established")
      return
    }

    setConnectionStatus(EnumConnectionStatus.StartConnecting)
    printConnectionCallback("Establishing Connection, please wait.")

    const enabledTransports: Transport[] = ["sockjs", "ws"]

    const pusherConfiguration = {
      cluster,
      authEndpoint: props.authEndpoint,
      enabledTransports,
    }

    pusherChannelClient.current = new PusherJS(appKey, pusherConfiguration)

    if (pusherChannelClient.current) {
      subscribeToChannel()
      monitorConnection()
      monitorError()
      monitorDisconnected()
      monitorFail()
    }
  }

  const sendMessage = (message: string) => {
    if (channel.current) {
      const isSent = channel.current.trigger(eventName, { message })
      return isSent
    }
    return false
  }

  const emitMessage = (message: string, senderId: number) => {
    if (channel.current) {
      channel.current.emit(eventName, { senderId, message })
      return true
    }
    return false
  }

  const emitConnectionEvent = (event: string, message?: any) => {
    if (pusherChannelClient.current) {
      pusherChannelClient.current.connection.emit(event, message)
    }
  }

  const disconnect = () => {
    if (pusherChannelClient.current) {
      pusherChannelClient.current.disconnect()
    }
  }

  const isConnected = (() => {
    switch (connectionStatus) {
      case EnumConnectionStatus.Connected:
      case EnumConnectionStatus.Error:
        return true
      default:
        return false
    }
  })()

  return {
    connect,
    send: sendMessage, //sender does not receive emitted data
    emit: emitMessage, //sender receive emitted data
    emitConnection: emitConnectionEvent,
    disconnect,
    isConnected,
    connectionStatus,
    channelName,
    eventName,
  }
}
