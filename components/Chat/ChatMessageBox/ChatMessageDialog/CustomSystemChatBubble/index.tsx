import { decodeMessage } from "@/components/Chat/config/MessageFormatter"
import {
  Author,
  ChatBubbleProps,
  Message,
  SystemChatBubble,
} from "react-bell-chat"

const CustomSystemChatBubble = ({
  message,
  ...remainingProps
}: ChatBubbleProps<unknown, Message<string>, Author>) => {
  const renderMessage = (formattedMessage: string) => (
    <SystemChatBubble
      message={{
        ...message,
        message: formattedMessage,
      }}
      {...remainingProps}
    />
  )

  const complexMessage = decodeMessage(message.message)

  switch (complexMessage.message) {
    default:
      return renderMessage(complexMessage.message)
  }
}

export default CustomSystemChatBubble
