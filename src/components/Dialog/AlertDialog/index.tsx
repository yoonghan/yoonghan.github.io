import Button from "../../Button"
import React, { useCallback, useRef } from "react"
import Dialog, { DialogHandler } from ".."
import styles from "./AlertDialog.module.css"

export interface Props {
  title: string
  message: string
  okBtnText?: string
  onOk: () => void
}

const AlertDialog = ({ title, message, okBtnText, onOk }: Props) => {
  const dialogRef = useRef<DialogHandler>(null)

  const onAction = useCallback(
    () =>
      (
        e?:
          | React.FormEvent<HTMLFormElement>
          | React.MouseEvent<HTMLButtonElement>
      ) => {
        e?.preventDefault()

        if (dialogRef.current !== null) {
          dialogRef.current.close()
        }
        onOk()
      },
    [onOk]
  )

  return (
    <Dialog onCancel={onAction()} ref={dialogRef} nonPortal={true}>
      <div className={styles.container}>
        <div>
          <h4>{title}</h4>
          <p>{message}</p>
        </div>
        <hr />
        <div className={styles.buttonContainer}>
          <Button color="blue" onClick={onAction()}>
            {okBtnText ?? "Ok"}
          </Button>
        </div>
      </div>
    </Dialog>
  )
}

export default React.memo(AlertDialog)
