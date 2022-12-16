import {
  FormEvent,
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react"
import ChatMessageDialog, { MessageHandler } from "./ChatMessageDialog"
import styles from "./ChatMessageBox.module.css"
import Button from "@/components/Button"
import TextArea from "@/components/Input/TextArea"

interface Props {
  onMessageSend: (message: string) => void
}

const ChatMessageBox = forwardRef<MessageHandler, Props>(
  function ChatMessageDialogWithMessageHandler({ onMessageSend }, ref) {
    const chatMessageDialogRef = useRef<MessageHandler>(null)
    const [message, setMessage] = useState("")

    const sendMessage = (e?: Event | FormEvent) => {
      e?.preventDefault()
      if (chatMessageDialogRef.current !== null && message !== "") {
        chatMessageDialogRef.current.addMessage(1, message)
        onMessageSend(message)
      }
      setMessage("")
    }

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
        <form action="" onSubmit={sendMessage}>
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
          </fieldset>
          <Button {...{ type: "submit" }} color="grey">
            Send
          </Button>
        </form>
      </div>
    )
  }
)

export default ChatMessageBox
