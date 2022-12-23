import { decodeMessage } from "@/components/Chat/config/MessageFormatter"
import { MessageType } from "@/components/Chat/config/MessageType"
import { CSSProperties } from "react"
import {
  Author,
  ChatBubbleProps,
  Message,
  SystemChatBubble,
} from "react-bell-chat"

const CustomSystemChatBubble = ({
  message,
  ...remainingProps
}: ChatBubbleProps<any, Message<string>, Author>) => {
  const renderMessage = (
    formattedMessage: string,
    textStyle?: CSSProperties
  ) => (
    <SystemChatBubble
      {...remainingProps}
      styles={{
        systemChatBubbleContainer: textStyle,
      }}
      message={{
        ...message,
        message: formattedMessage,
      }}
    />
  )

  const complexMessage = decodeMessage(message.message)

  switch (complexMessage.messageType) {
    case MessageType.CONNECTION:
      return renderMessage(complexMessage.message, { color: "deepskyblue" })
    case MessageType.CONNECTION_ERROR:
      return renderMessage(complexMessage.message, { color: "darkred" })
    default:
      return renderMessage(complexMessage.message)
  }
}

export default CustomSystemChatBubble
