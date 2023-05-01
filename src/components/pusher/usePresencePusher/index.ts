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
  const [myId, setMyId] = useState("")
  const errorMessage = useRef<string>()
  const connectionStatus = useRef<EnumConnectionStatus>(
    EnumConnectionStatus.Disconnected
  )

  const channelName = "presence-wal_videocall"

  const updateConnectionStatus = (
    latestConnectionStatus: EnumConnectionStatus
  ) => {
    connectionStatus.current = latestConnectionStatus
    updateConnectionCallback(latestConnectionStatus)
  }

  const subscribeToChannel = (pusher: PusherJS) => {
    channel.current = pusher.subscribe("presence-videocall")
    bindChannel(channel.current)
  }

  const bindChannel = (channel: Channel) => {
    channel.bind("pusher:subscription_error", (error: any) => {
      errorMessage.current = JSON.stringify(error)
      updateConnectionStatus(EnumConnectionStatus.Error)
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
      subscribeToChannel(pusher.current)
    }
  }

  const emit = (eventName: string, message: object) => {
    if (channel.current) {
      channel.current.emit(eventName, message)
    }
  }

  const getErrorMessage = () => errorMessage.current

  return {
    connect,
    emit,
    channelName,
    onlineUsers,
    myId,
    errorMessage: getErrorMessage,
  }
}
