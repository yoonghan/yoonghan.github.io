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
        <form action="" onSubmit={handleSubmit}>
          <fieldset>
            <label>
              Message:
              <input
                onChange={(event) => setMessage(event.target.value)}
                value={message}
                placeholder="Your Message"
              />
            </label>
          </fieldset>
          <button type="submit" onClick={sendMessage}>
            Send
          </button>
        </form>
      </div>
    )
  }
)

export default ChatMessageBox
