import { isALink } from "@/components/Chat/config/MessageHelper"
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

  if (isALink(message.message)) {
    return (
      <a href={message.message} target={"_blank"} rel="noreferrer">
        {renderMessage("[File Received]")}
      </a>
    )
  } else {
    return renderMessage(message.message)
  }
}

export default CustomMessageRender
