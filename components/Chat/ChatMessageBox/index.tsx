import {
  FormEvent,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react"
import ChatMessageDialog, { MessageHandler, userId } from "./ChatMessageDialog"
import styles from "./ChatMessageBox.module.css"
import Button from "@/components/Button"
import TextArea from "@/components/Input/TextArea"
import { useDropzone } from "react-dropzone"
import UploadConfirmDialog from "./UploadConfirmDialog"

interface Props {
  onMessageSend: (message: string) => void
}

const dropFile =
  (callback: (message: string, notifyReceipient?: boolean) => void) =>
  (acceptedFiles: File[]) => {
    const formData = new FormData()
    formData.append("file", acceptedFiles[0])

    callback(`Uploading file ${acceptedFiles[0].name}...`)

    fetch("/api/firebase", {
      method: "POST",
      body: formData,
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.status === "ok") {
          callback(`Uploaded ${data.data}`, true)
        } else {
          callback(`File upload failed`)
        }
      })
      .catch((err) => {
        callback(`File upload failed, (${err})`)
      })
  }

const ChatMessageBox = forwardRef<MessageHandler, Props>(
  function ChatMessageDialogWithMessageHandler({ onMessageSend }, ref) {
    const chatMessageDialogRef = useRef<MessageHandler>(null)
    const [message, setMessage] = useState("")
    const [filesToUpload, setFilesToUpload] = useState<File[]>()
    const [isShownUploadConfirmDialog, setShowUploadConfirmDialog] =
      useState(false)

    const sendMessage = (e?: Event | FormEvent) => {
      e?.preventDefault()
      if (chatMessageDialogRef.current !== null && message !== "") {
        chatMessageDialogRef.current.addMessage(userId, message)
        onMessageSend(message)
      }
      setMessage("")
    }

    const sendFileMessage = (message: string, notifyReceipient = false) => {
      if (chatMessageDialogRef.current !== null) {
        chatMessageDialogRef.current.addMessage(undefined, message)
        if (notifyReceipient) onMessageSend(message)
      }
    }

    const dropFileWithMessage = useMemo(() => dropFile(sendFileMessage), [])

    const onDrop = (acceptedFiles: File[]) => {
      if (acceptedFiles && acceptedFiles.length > 0) {
        setFilesToUpload(acceptedFiles)
        setShowUploadConfirmDialog(true)
      }
    }

    const { getRootProps, getInputProps, inputRef } = useDropzone({
      onDrop,
    })

    const onUploadConfirmReply = useCallback(
      (response: "yes" | "no") => {
        if (response === "yes" && filesToUpload !== undefined) {
          dropFileWithMessage(filesToUpload)
        }
        setShowUploadConfirmDialog(false)
      },
      [dropFileWithMessage, filesToUpload]
    )

    useImperativeHandle(ref, () => {
      return {
        addMessage(senderId: number | undefined, message: string) {
          if (chatMessageDialogRef.current !== null) {
            chatMessageDialogRef.current.addMessage(senderId, message)
          }
        },
      }
    })

    return (
      <div className={styles.container}>
        <ChatMessageDialog ref={chatMessageDialogRef} />
        <br />
        <form
          action=""
          onSubmit={sendMessage}
          {...getRootProps({
            onClick: (event) => event.stopPropagation(),
          })}
        >
          <fieldset>
            <label htmlFor="message">Message: </label>
            <br />
            <TextArea
              onChange={(event) => {
                setMessage(event.target.value)
              }}
              onSubmit={sendMessage}
              value={message}
              additionalProps={{
                id: "message",
                placeholder: "Your Message",
                rows: 5,
              }}
            />
            <hr />

            <label htmlFor="file-upload">Upload File: </label>
            <input
              {...getInputProps()}
              id="file-upload"
              data-testid="file-uploader"
            />
            <button
              id="file-upload-btn"
              aria-label="Upload"
              onClick={() => {
                inputRef.current?.click()
              }}
            >
              <i className="fas fa-paperclip"></i>
            </button>
          </fieldset>
          <Button {...{ type: "submit" }} color="grey">
            Send
          </Button>
        </form>
        {isShownUploadConfirmDialog && (
          <UploadConfirmDialog onReplyClick={onUploadConfirmReply} />
        )}
      </div>
    )
  }
)

export default ChatMessageBox
