import { decodeMessage } from "@/components/Chat/config/MessageFormatter"
import { MessageType } from "@/components/Chat/config/MessageType"
import { Message, MessageRenderProps } from "react-bell-chat"

const CustomMessageRender = ({
  message,
  className,
  style,
}: MessageRenderProps<string, Message<string>>) => {
  const renderMessage = (message: string) => (
    <span style={style} className={className}>
      {message}
    </span>
  )

  const complexMessage = decodeMessage(message.message)

  switch (complexMessage.messageType) {
    case MessageType.FILE:
      return (
        <a href={complexMessage.message} target={"_blank"} rel="noreferrer">
          {renderMessage("[File Received]")}
        </a>
      )
    default:
      return renderMessage(complexMessage.message)
  }
}

export default CustomMessageRender
