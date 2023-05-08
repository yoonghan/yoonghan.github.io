import PusherJS, { Channel } from "pusher-js"
import { useReducer, useRef, useState } from "react"
import { EnumConnectionStatus } from "../type/ConnectionStatus"
import { onlineUserReducer } from "./onlineReducer"

type MemberInfo = {
  name: string
}

type Member = {
  id: string
  info: MemberInfo
}

export type Props = {
  appKey: string
  cluster: string
  authEndpoint: string
  updateConnectionCallback: (
    latestConnectionStatus: EnumConnectionStatus
  ) => void
}

export const usePresencePusher = ({
  appKey,
  cluster,
  authEndpoint,
  updateConnectionCallback,
}: Props) => {
  const pusher = useRef<PusherJS>()
  const channel = useRef<Channel>()

  const [onlineUsers, dispatch] = useReducer(onlineUserReducer, [])
  const [eventsBinded, setEventsBinded] = useState<string[]>([])
  const [myId, setMyId] = useState("")
  const errorMessage = useRef<string>()
  const connectionStatus = useRef<EnumConnectionStatus>(
    EnumConnectionStatus.Disconnected
  )

  const channelName = "presence-wal-videocall"

  const updateConnectionStatus = (
    latestConnectionStatus: EnumConnectionStatus
  ) => {
    connectionStatus.current = latestConnectionStatus
    updateConnectionCallback(latestConnectionStatus)
  }

  const bindChannel = (channel: Channel) => {
    channel.bind("pusher:subscription_error", (error: any) => {
      errorMessage.current = JSON.stringify(error)
      updateConnectionStatus(EnumConnectionStatus.Error)
      disconnect()
    })

    channel.bind("pusher:subscription_succeeded", (membership: any) => {
      updateConnectionStatus(EnumConnectionStatus.Connected)
      const myId = membership?.me?.id
      setMyId(myId)
      Object.entries(membership.members).forEach((member) => {
        const id = member[0]
        if (myId !== id) {
          dispatch({
            type: "ADD_USER",
            payload: {
              id,
              name: (member[1] as MemberInfo).name,
            },
          })
        }
      })
    })

    channel.bind("pusher:member_added", (member: Member) => {
      dispatch({
        type: "ADD_USER",
        payload: { id: member.id, name: member.info.name },
      })
    })

    channel.bind("pusher:member_removed", (member: Member) => {
      dispatch({
        type: "REMOVE_USER",
        payload: { id: member.id },
      })
    })
  }

  const connect = (userId: string) => {
    if (pusher.current) {
      return
    }
    updateConnectionStatus(EnumConnectionStatus.StartConnecting)

    const pusherConfiguration = {
      cluster,
      authEndpoint: `${authEndpoint}/${userId}`,
    }

    pusher.current = new PusherJS(appKey, pusherConfiguration)

    if (pusher.current) {
      channel.current = pusher.current.subscribe(channelName)
      bindChannel(channel.current)
    }
  }

  const disconnect = () => {
    if (pusher.current) {
      pusher.current.unsubscribe(channelName)
      channel.current = undefined
      pusher.current = undefined
      dispatch({
        type: "CLEAR_USERS",
      })
      setEventsBinded([])
      updateConnectionStatus(EnumConnectionStatus.Disconnected)
    }
  }

  const emit = (eventName: string, message: object) => {
    if (channel.current) {
      channel.current.emit(eventName, message)
    }
  }

  const trigger = <T extends object>(event: string, data: T) => {
    if (channel.current) {
      channel.current.trigger(event, {
        ...data,
        from: myId,
      })
      return
    }
    throw new Error("Channel has not been initialized")
  }

  const bind = <T extends object>(
    event: string,
    callback: (data: T) => void
  ): boolean => {
    if (channel.current) {
      if (eventsBinded.includes(event)) {
        return false
      }
      channel.current.bind(event, callback)
      setEventsBinded((oldState) => [...oldState, event])
      return true
    }
    throw new Error("Channel has not been initialized")
  }

  const getErrorMessage = () => errorMessage.current

  return {
    connect,
    disconnect,
    emit,
    bind,
    trigger,
    channelName,
    onlineUsers,
    myId,
    errorMessage: getErrorMessage,
  }
}
