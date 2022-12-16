import {
  FormEvent,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from "react"
import ChatMessageDialog, { MessageHandler } from "./ChatMessageDialog"
import styles from "./ChatMessageBox.module.css"
import Button from "@/components/Button"

interface Props {
  onMessageSend: (message: string) => void
}

const ChatMessageBox = forwardRef<MessageHandler, Props>(
  function ChatMessageDialogWithMessageHandler({ onMessageSend }, ref) {
    const chatMessageDialogRef = useRef<MessageHandler>(null)
    const [message, setMessage] = useState("")

    const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
    }, [])

    const sendMessage = () => {
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
        <form action="" onSubmit={handleSubmit}>
          <fieldset>
            <label>
              Message: <br />
              <input
                onChange={(event) => setMessage(event.target.value)}
                value={message}
                placeholder="Your Message"
              />
            </label>
          </fieldset>
          <Button {...{ type: "submit" }} onClick={sendMessage} color="grey">
            Send
          </Button>
        </form>
      </div>
    )
  }
)

export default ChatMessageBox
