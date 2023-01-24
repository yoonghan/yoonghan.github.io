import { useCallback, useMemo, useState } from "react"
import { createConfirmation } from "react-confirm"
import Button from "../Button"
import dialogRootCreator from "../Dialog/dialogRootCreator"
import EmailSender from "./EmailSender"
import styles from "./LetterBox.module.css"

export const email = "walcoor_perati_on@gm_ail.com".replace(/_/g, "")

const LetterBox = () => {
  const [name, setName] = useState("")

  const confirmation = useMemo(
    () => createConfirmation(EmailSender, 1000, dialogRootCreator.create()),
    []
  )

  const onSubmitPressed = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSendButtonClick()
  }

  const onSendButtonClick = useCallback(() => {
    confirmation({
      writeFrom: name.trim(),
      writeTo: email,
      onCancel: () => {
        setName("")
      },
    })
  }, [confirmation, name])

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
      </form>
    </div>
  )
}

export default LetterBox
