/* istanbul ignore file */
/** Good case to create integration testing rather than mock testing **/
"use client"

import { usePusher } from "@/components/utils/hooks/pusher/usePusher"
import ChatMessageBox from "@/components/Chat/ChatMessageBox"
import { useCallback, useEffect, useMemo, useRef } from "react"
import { MessageHandler } from "@/components/Chat/ChatMessageBox/ChatMessageDialog"
import { withNonEmptyEnvCheck } from "@/components/utils/hoc/withEnvCheck/withEnvCheck"
import { MessageType } from "@/components/Chat/config/MessageType"

interface Props {
  appKey?: string
  cluster?: string
}

const Messenger = ({ appKey, cluster }: Props) => {
  const chatMessageBoxRef = useRef<MessageHandler>(null)

  const printMessage =
    (sender?: number) => (message: string, messageType: MessageType) => {
      if (chatMessageBoxRef.current !== null) {
        chatMessageBoxRef.current.addMessage(sender, message, messageType)
      }
    }

  const connectionPrinter = useMemo(() => printMessage(undefined), [])
  const eventPrinter = useMemo(() => printMessage(2), [])

  const { connect, disconnect, send } = usePusher({
    eventName: "walcron_messenger",
    channelName: "FunChat",
    printConnectionCallback: connectionPrinter,
    printEventCallback: eventPrinter,
    appKey: appKey!,
    cluster: cluster!,
    authEndpoint: "/api/pusherauth",
    channelPrefix: "private",
  })

  /**
   * Found reason that useHook returning "object" does a re-render if used as dependency
   */
  useEffect(() => {
    connect()

    return () => {
      disconnect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onMessageSend = useCallback(
    (message: string, messageType: MessageType) => {
      send(message, messageType)
    },
    [send]
  )

  return (
    <div className="page-aligned-container">
      <h1>A Walcron Chat Program</h1>
      <p>
        Used this to test on 3rd party integration and asynchronous replies. The
        reason this was build was to test authentication, code coverage,
        integration and capabilites of asynchronous system.
      </p>
      <ChatMessageBox onMessageSend={onMessageSend} ref={chatMessageBoxRef} />
    </div>
  )
}

export default withNonEmptyEnvCheck(
  Messenger,
  () => ({
    appKey: process.env.NEXT_PUBLIC_PUSHER_APP_KEY,
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
  }),
  "Pusher initialization failed due to missing environment variable."
)
