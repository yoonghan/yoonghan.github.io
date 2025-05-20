import { decodeMessage } from "../../../config/MessageFormatter"
import { MessageType } from "../../../config/MessageType"
import { useCallback, useState } from "react"
import { Message, MessageRenderProps } from "react-bell-chat"
import Button from "@/components/Button"
import { useDialogCreation } from "@/components/Dialog/useDialogCreation/useDialogCreation"
import ConfirmationDialog from "@/components/Dialog/ConfirmationDialog"

const CustomMessageRender = ({
  message,
  className,
  style,
}: MessageRenderProps<string, Message<string>>) => {
  const [allowDownload, setAllowDownload] = useState(false)
  const confirm = useDialogCreation(ConfirmationDialog)

  const renderMessage = useCallback(
    (message: string) => (
      <span style={style} className={className}>
        {message}
      </span>
    ),
    [className, style]
  )

  const downloadCheck = useCallback(async () => {
    await confirm({
      title: "Download Unverified File",
      onYesClick: () => setAllowDownload(true),
      message:
        "It's a public file and may contain malicious content. Are you sure you want to download it?",
      nonPortal: true,
    })
  }, [confirm])

  const complexMessage = decodeMessage(message.message)

  if (complexMessage.messageType === MessageType.FILE) {
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
  }

  return renderMessage(complexMessage.message)
}

export default CustomMessageRender
