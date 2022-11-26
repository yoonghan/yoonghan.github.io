import { useState } from "react"
import Button from "../Button"
import Modal from "../Modal"
import EmailSender from "./EmailSender"
import styles from "./LetterBox.module.css"

const LetterBox = () => {
  const [isDialogShown, setIsDialogShown] = useState(false)
  const [name, setName] = useState("")

  const onClose = () => {
    setIsDialogShown(false)
    setName("")
  }

  const onSubmitPressed = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSendButtonClick()
  }

  const onSendButtonClick = () => {
    setIsDialogShown(true)
  }

  const email = "walcoor_perati_on@gm_ail.com".replace(/_/g, "")

  return (
    <div>
      If you are interested to talk to us, leave us your contact. Let us reach
      you instead.
      <form className={styles.container} onSubmit={onSubmitPressed}>
        <input
          type="text"
          autoComplete="off"
          className={styles.input}
          maxLength={200}
          placeholder={"Honorific and name"}
          onChange={(event) => setName(event.target.value)}
          value={name}
        />
        <Button>Write To Us</Button>
        {isDialogShown && (
          <Modal onCancel={onClose}>
            <EmailSender writeFrom={name.trim()} writeTo={email} />
          </Modal>
        )}
      </form>
    </div>
  )
}

export default LetterBox
