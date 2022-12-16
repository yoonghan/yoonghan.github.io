import { forwardRef, useImperativeHandle, useRef } from "react"
import { useEffect } from "react"
import { useState } from "react"
import { Message } from "react-bell-chat"

import dynamic from "next/dynamic"

const ChatFeed = dynamic(() => import("./NoSSRChatFeed"), {
  ssr: false,
  loading: () => (
    <div style={{ fontFamily: "Inconsolata", color: "green" }}>
      Loading Chat Room
    </div>
  ),
})

export type MessageHandler = {
  addMessage: (senderId: number | undefined, message: string) => void
}

export interface Props {
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
    const [messages, setMessages] = useState<Message[]>(initialMessage || [])
    const height = useRef<number>(0)

    useEffect(() => {
      height.current = document.body.offsetHeight
    }, [])

    useImperativeHandle(ref, () => {
      return {
        addMessage(senderId: number | undefined, message: string) {
          setMessages([
            ...messages,
            {
              id: messages.length,
              authorId: senderId,
              message,
              createdOn: new Date(),
              isSend: true,
            },
          ])
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
