import PusherJS, { Channel } from "pusher-js"
import { useRef, useState } from "react"
import { EnumConnectionStatus } from "../type/ConnectionStatus"

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
  const [onlineUsers, setOnlineUsers] = useState<string[]>([])
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
      setOnlineUsers(
        Object.keys(membership.members).filter(
          (member: string) => myId !== member
        )
      )
    })

    channel.bind("pusher:member_added", (member: any) => {
      setOnlineUsers((onlineUsers) => [...onlineUsers, member.id])
    })

    channel.bind("pusher:member_removed", (member: any) => {
      setOnlineUsers((onlineUsers) => {
        const index = onlineUsers.indexOf(member.id)
        const newOnlineUser = [...onlineUsers]
        newOnlineUser.splice(index, 1)
        return newOnlineUser
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
