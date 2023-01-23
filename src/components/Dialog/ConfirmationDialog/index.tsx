import Button from "../../Button"
import React, { useRef } from "react"
import Dialog, { DialogHandler } from ".."
import styles from "./ConfirmationDialog.module.css"
import { createConfirmation } from "react-confirm"

interface Props {
  title: string
  message: string
  onCancel: () => void
  onNoClick: () => void
  onYesClick: () => void
  yesButtonText?: string
  noButtonText?: string
  nonPortal?: boolean
}

const ConfirmationDialog = ({
  title,
  message,
  onNoClick: _onNoClick,
  onYesClick: _onYesClick,
  onCancel,
  yesButtonText,
  noButtonText,
  nonPortal = true,
}: Props) => {
  const dialogRef = useRef<DialogHandler>(null)

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onYesClick()
  }

  const onYesClick = () => {
    if (dialogRef.current !== null) {
      dialogRef.current.close()
      _onYesClick()
    }
  }

  const onNoClick = () => {
    if (dialogRef.current !== null) {
      dialogRef.current.close()
      _onNoClick()
    }
  }

  return (
    <Dialog onCancel={onCancel} ref={dialogRef} nonPortal={nonPortal}>
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

export const confirmationDialogWrapper = (props: Props) => {
  return createConfirmation(ConfirmationDialog)({ ...props, nonPortal: true })
}

export default React.memo(ConfirmationDialog)
