"use client"

import { useCallback, useState } from "react"
import Button from "../Button"
import { useDialogCreation } from "../Dialog/useDialogCreation/useDialogCreation"
import EmailSender from "./EmailSender"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEnvelope } from "@fortawesome/free-solid-svg-icons"

export const email = "walcoor_perati_on@gm_ail.com".replace(/_/g, "")

const LetterBox = () => {
  const [name, setName] = useState("")
  const confirm = useDialogCreation(EmailSender)

  const onSubmitPressed = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSendButtonClick()
  }

  const onSendButtonClick = useCallback(() => {
    confirm({
      writeFrom: name.trim(),
      writeTo: email,
      onCancel: () => {
        setName("")
      },
    })
  }, [confirm, name])

  return (
    <section className="text-center max-w-screen-sm mx-auto">
      <div className="text-2xl pb-4 font-bold">
        Contact Us <FontAwesomeIcon icon={faEnvelope} className="pr-2" />
      </div>
      <div>
        If you are interested to talk to us, leave us your contact. Let us reach
        you instead.
        <form
          onSubmit={onSubmitPressed}
          className="flex gap-2 p-4 w-full max-w-screen-sm mx-auto"
        >
          <input
            type="text"
            autoComplete="off"
            maxLength={200}
            placeholder={"Honorific and name"}
            onChange={(event) => setName(event.target.value)}
            value={name}
            className="w-full"
          />
          <Button>
            <FontAwesomeIcon icon={faEnvelope} className="pr-2" />
            Write To Us
          </Button>
        </form>
      </div>
    </section>
  )
}

export default LetterBox
