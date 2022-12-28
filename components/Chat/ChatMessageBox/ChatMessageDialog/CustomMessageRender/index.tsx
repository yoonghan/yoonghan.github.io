import Button from "@/components/Button"
import { decodeMessage } from "@/components/Chat/config/MessageFormatter"
import { MessageType } from "@/components/Chat/config/MessageType"
import { useCallback, useState } from "react"
import { Message, MessageRenderProps } from "react-bell-chat"
import DownloadConfirmDialog from "../../DownloadConfirmDialog"

const CustomMessageRender = ({
  message,
  className,
  style,
}: MessageRenderProps<string, Message<string>>) => {
  const [allowDownload, setAllowDownload] = useState(false)
  const [showDownloadDialog, setShowDownloadDialog] = useState(false)

  const renderMessage = useCallback(
    (message: string) => (
      <span style={style} className={className}>
        {message}
      </span>
    ),
    [className, style]
  )

  const downloadConfirmed = (reply: "yes" | "no") => {
    setAllowDownload(reply === "yes")
    setShowDownloadDialog(false)
  }

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
            <Button onClick={() => setShowDownloadDialog(true)}>
              Open file ?
            </Button>
          )}
          {showDownloadDialog && (
            <DownloadConfirmDialog onReplyClick={downloadConfirmed} />
          )}
        </>
      )
    default:
      return renderMessage(complexMessage.message)
  }
}

export default CustomMessageRender
