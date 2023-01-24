import { decodeMessage } from "../../../config/MessageFormatter"
import { MessageType } from "../../../config/MessageType"
import { useCallback, useState } from "react"
import { Message, MessageRenderProps } from "react-bell-chat"
import Button from "@/components/Button"
import { confirmationDialogWrapper } from "@/components/Dialog/ConfirmationDialog"

const CustomMessageRender = ({
  message,
  className,
  style,
}: MessageRenderProps<string, Message<string>>) => {
  const [allowDownload, setAllowDownload] = useState(false)

  const renderMessage = useCallback(
    (message: string) => (
      <span style={style} className={className}>
        {message}
      </span>
    ),
    [className, style]
  )

  const onCancelClick = useCallback(() => {
    setAllowDownload(false)
  }, [])

  const downloadCheck = useCallback(async () => {
    await confirmationDialogWrapper({
      title: "Download Unverified File",
      onCancel: onCancelClick,
      onNoClick: onCancelClick,
      onYesClick: () => setAllowDownload(true),
      message:
        "It's a public file and may contain malicious content. Are you sure you want to download it?",
    })
  }, [onCancelClick])

  const complexMessage = decodeMessage(message.message)

  switch (complexMessage.messageType) {
    case MessageType.FILE:
      return (
        <>
          {allowDownload ? (
            <a href={complexMessage.message} target={"_blank"} rel="noreferrer">
              {renderMessage("[File Received]")}
            </a>
          ) : (
            <Button onClick={downloadCheck}>Open file ?</Button>
          )}
        </>
      )
    default:
      return renderMessage(complexMessage.message)
  }
}

export default CustomMessageRender
