import { useRef, useDebugValue } from "react"
import PusherJS, { Channel } from "pusher-js"
import { PUSHER } from "../../../../Chat/config"
import { Transport } from "pusher-js/types/src/core/config"
import { Emitter } from "../type/Emitter"
import { EnumConnectionStatus } from "../type/ConnectionStatus"
import { MessageType } from "../../../../Chat/config/MessageType"
import {
  decodeMessage,
  encodeMessage,
} from "../../../../Chat/config/MessageFormatter"
import { site } from "@/config/site"

type Props = {
  eventName: string
  channelName: string
  printConnectionCallback: (message: string, messageType: MessageType) => void
  printEventCallback: (
    message: string,
    messageType: MessageType,
    senderId?: number
  ) => void
  appKey: string
  cluster: string
  channelPrefix?: string
  authEndpoint?: string
}

export function usePusher(props: Props) {
  const { printConnectionCallback, printEventCallback, appKey, cluster } = props
  const pusherChannelClient = useRef<PusherJS>()
  const channel = useRef<Channel>()
  const connectionStatus = useRef<EnumConnectionStatus>(
    EnumConnectionStatus.Disconnected
  )

  const channelName = `${props.channelPrefix ? props.channelPrefix + "-" : ""}${
    PUSHER.channel_prefix
  }${props.channelName}`
  const eventName = `client-${props.eventName}`

  useDebugValue("connection:" + connectionStatus.current)

  const updateConnectionStatus = (
    latestConnectionStatus: EnumConnectionStatus
  ) => {
    connectionStatus.current = latestConnectionStatus
    printConnectionCallback(
      `Status: ${latestConnectionStatus}`,
      MessageType.CONNECTION
    )
  }

  const subscribeToChannel = () => {
    if (pusherChannelClient.current) {
      channel.current = pusherChannelClient.current.subscribe(channelName)
      channel.current.bind(
        eventName,
        (data: { message: string; senderId?: number }) => {
          const complexMessage = decodeMessage(data.message)
          printEventCallback(
            complexMessage.message,
            complexMessage.messageType,
            data.senderId
          )
        }
      )
    }
  }

  const monitorOnlineUsers = () => {
    if (channel.current) {
      channel.current.bind(
        "pusher:subscription_count",
        (data: { subscription_count: string }) => {
          printConnectionCallback(
            `Active user count: ${data.subscription_count}`,
            MessageType.USERCOUNT
          )
        }
      )
    }
  }

  const monitorConnection = () => {
    if (pusherChannelClient.current) {
      pusherChannelClient.current.connection.bind("connected", () => {
        updateConnectionStatus(EnumConnectionStatus.Connected)
      })
    }
  }

  const monitorFail = () => {
    if (pusherChannelClient.current) {
      pusherChannelClient.current.connection.bind("failed", () => {
        updateConnectionStatus(EnumConnectionStatus.Disconnected)
        printConnectionCallback(
          "Connection failed as websocket is not supported by browser",
          MessageType.CONNECTION_ERROR
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
            "A different Id was requested, please refresh the page.",
            MessageType.CONNECTION_ERROR
          )
          updateConnectionStatus(EnumConnectionStatus.Disconnected)
          pusherChannelClient.current = undefined
          channel.current = undefined
        } else {
          // eslint-disable-next-line no-console
          console.error("error", error)
          updateConnectionStatus(EnumConnectionStatus.Error)
          printConnectionCallback(
            "Interruption error encountered",
            MessageType.CONNECTION_ERROR
          )
        }
      })
    }
  }

  const monitorDisconnected = () => {
    if (pusherChannelClient.current) {
      pusherChannelClient.current.connection.bind("disconnected", () => {
        updateConnectionStatus(EnumConnectionStatus.Disconnected)
        printConnectionCallback("Disconnected", MessageType.CONNECTION_ERROR)
        pusherChannelClient.current = undefined
        channel.current = undefined
      })
    }
  }

  const connect = () => {
    if (pusherChannelClient.current) {
      printConnectionCallback(
        "Connection is already established",
        MessageType.TEXT
      )
      return
    }

    updateConnectionStatus(EnumConnectionStatus.StartConnecting)
    printConnectionCallback(
      "Establishing Connection, please wait.",
      MessageType.TEXT
    )

    const enabledTransports: Transport[] = ["sockjs", "ws"]

    const pusherConfiguration = {
      cluster,
      authEndpoint: `${site.url}/props.authEndpoint`,
      enabledTransports,
    }
    pusherChannelClient.current = new PusherJS(appKey, pusherConfiguration)

    if (pusherChannelClient.current) {
      subscribeToChannel()
      monitorConnection()
      monitorError()
      monitorDisconnected()
      monitorFail()
      monitorOnlineUsers()
    }
  }

  const sendMessage = (message: string, messageType: MessageType) => {
    if (channel.current) {
      const complexMessage = encodeMessage(message, messageType)
      const isSent = channel.current.trigger(eventName, {
        message: complexMessage,
      })
      return isSent
    }
    return false
  }

  const emit = (type: "Event" | "NoOfUsers"): Emitter => {
    switch (type) {
      case "Event":
        return (message: string, senderId: number) => {
          if (channel.current) {
            channel.current.emit(eventName, { senderId, message })
            return true
          }
          return false
        }
      case "NoOfUsers": {
        return (subscription_count: number) => {
          if (channel.current) {
            channel.current.emit("pusher:subscription_count", {
              subscription_count,
            })
            return true
          }
          return false
        }
      }
    }
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

  const isConnected = () => {
    switch (connectionStatus.current) {
      case EnumConnectionStatus.Connected:
      case EnumConnectionStatus.Error:
        return true
      default:
        return false
    }
  }

  const getConnectionStatus = () => {
    return connectionStatus.current
  }

  return {
    connect,
    send: sendMessage, //sender does not receive emitted data
    emit, //sender receive emitted data
    emitConnection: emitConnectionEvent,
    disconnect,
    isConnected,
    getConnectionStatus,
    channelName,
    eventName,
  }
}
