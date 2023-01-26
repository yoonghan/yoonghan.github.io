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
import Button from "../../Button"
import TextArea from "../../Input/TextArea"
import { useDropzone } from "react-dropzone"
import { MessageType } from "../config/MessageType"
import { useDialogCreation } from "@/components/Dialog/useDialogCreation/useDialogCreation"
import ConfirmationDialog from "@/components/Dialog/ConfirmationDialog"

interface Props {
  onMessageSend: (message: string, messageType: MessageType) => void
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
          callback(`${data.data}`, true)
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
    const confirm = useDialogCreation(ConfirmationDialog)
    const chatMessageDialogRef = useRef<MessageHandler>(null)
    const [message, setMessage] = useState("")

    const sendMessage = (e?: Event | FormEvent) => {
      e?.preventDefault()
      if (chatMessageDialogRef.current !== null && message !== "") {
        chatMessageDialogRef.current.addMessage(userId, message)
        onMessageSend(message, MessageType.TEXT)
      }
      setMessage("")
    }

    const sendFileMessage = useCallback(
      (message: string, notifyReceipient = false) => {
        if (chatMessageDialogRef.current !== null) {
          chatMessageDialogRef.current.addMessage(undefined, message)
          if (notifyReceipient) onMessageSend(message, MessageType.FILE)
        }
      },
      [onMessageSend]
    )

    const dropFileWithMessage = useMemo(
      () => dropFile(sendFileMessage),
      [sendFileMessage]
    )

    const onDrop = async (acceptedFiles: File[]) => {
      if (acceptedFiles && acceptedFiles.length > 0) {
        const filesToUpload = acceptedFiles
        if (inputRef.current) {
          inputRef.current.value = ""
        }
        await confirm({
          title: "Upload File",
          onYesClick: () => {
            filesToUpload && dropFileWithMessage(filesToUpload)
          },
          message: "This file will be shared publicly. Are you sure?",
          nonPortal: true,
        })
      }
    }

    const { getRootProps, getInputProps, inputRef } = useDropzone({
      onDrop,
    })

    useImperativeHandle(ref, () => {
      return {
        addMessage(
          senderId: number | undefined,
          message: string,
          messageType?: MessageType
        ) {
          if (chatMessageDialogRef.current !== null) {
            chatMessageDialogRef.current.addMessage(
              senderId,
              message,
              messageType
            )
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
          <Button additionalProps={{ type: "submit" }} color="grey">
            Send
          </Button>
        </form>
      </div>
    )
  }
)

export default ChatMessageBox
