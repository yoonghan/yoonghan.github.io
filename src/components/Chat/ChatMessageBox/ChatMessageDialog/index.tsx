import { forwardRef, useImperativeHandle, useReducer, useRef } from "react"
import { useEffect } from "react"
import { Message } from "react-bell-chat"

import dynamic from "next/dynamic"
import {
  MessageActionType,
  messageReducer,
  messageReducerInitialState,
} from "./useMessageReducer/useMessageReducer"
import { MessageType } from "../../config/MessageType"

const ChatFeed = dynamic(() => import("./NoSSRChatFeed"), {
  ssr: false,
  loading: () => (
    <div style={{ fontFamily: "Inconsolata", color: "green" }}>
      Loading Chat Room
    </div>
  ),
})

export type MessageHandler = {
  addMessage: (
    senderId: number | undefined,
    message: string,
    messageType?: MessageType
  ) => void
}

interface Props {
  initialMessage?: Message[]
}

export const userId = 1

export const authors = [
  {
    id: userId,
    name: "Me",
    avatarName: "ME",
    isTyping: true,
    lastSeenMessageId: 1,
    bgImageUrl: undefined,
  },
  {
    id: 2,
    name: "Anonymous",
    avatarName: "Anon",
    isTyping: false,
    lastSeenMessageId: 1,
    bgImageUrl: undefined,
  },
]

const ChatMessageDialog = forwardRef<MessageHandler, Props>(
  function ChatMessageDialogWithMessageHandler({ initialMessage }, ref) {
    const [messages, dispatch] = useReducer(
      messageReducer,
      initialMessage ?? messageReducerInitialState
    )
    const height = useRef<number>(0)

    useEffect(() => {
      height.current = document.body.offsetHeight
    }, [])

    useImperativeHandle(ref, () => {
      return {
        addMessage(
          senderId: number | undefined,
          message: string,
          messageType: MessageType = MessageType.TEXT
        ) {
          dispatch({
            type: MessageActionType.Add,
            payload: {
              message,
              type: messageType,
              authorId: senderId,
            },
          })
        },
      }
    })

    return (
      <div>
        <ChatFeed
          messages={messages}
          authors={authors}
          height={height.current}
          yourAuthorId={userId}
        />
      </div>
    )
  }
)

export default ChatMessageDialog
