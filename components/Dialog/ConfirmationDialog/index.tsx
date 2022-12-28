import Button from "@/components/Button"
import React from "react"
import Dialog from ".."
import styles from "./ConfirmationDialog.module.css"

interface Props {
  title: string
  message: string
  onCancel: () => void
  onNoClick: () => void
  onYesClick: () => void
  yesButtonText?: string
  noButtonText?: string
}

const ConfirmationDialog = ({
  title,
  message,
  onNoClick,
  onYesClick,
  onCancel,
  yesButtonText,
  noButtonText,
}: Props) => {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onYesClick()
  }

  return (
    <Dialog onCancel={onCancel}>
      <div className={styles.container}>
        <div>
          <h4>{title}</h4>
          <p>{message}</p>
        </div>
        <hr />
        <form onSubmit={onSubmit}>
          <div className={styles.buttonContainer}>
            <Button color="blue">{yesButtonText || "Yes"}</Button>
            <Button additionalProps={{ type: "button" }} onClick={onNoClick}>
              {noButtonText || "No"}
            </Button>
          </div>
        </form>
      </div>
    </Dialog>
  )
}

export default React.memo(ConfirmationDialog)
