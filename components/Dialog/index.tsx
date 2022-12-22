import { createRef, useEffect } from "react"
import { createPortal } from "react-dom"
import styles from "./Dialog.module.css"
import dialogRootCreator from "./dialogRootCreator"

interface DialogProps {
  isNotModal?: boolean
  onCancel: (
    event?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>
  ) => void
  children: React.ReactNode
}

const Dialog = ({ isNotModal = false, onCancel, children }: DialogProps) => {
  dialogRootCreator.create()
  const escRef = createRef<HTMLButtonElement>()
  const dialogElem = createRef<HTMLDialogElement>()
  const documentDialog = document.querySelector("#dialog-root") as Element

  useEffect(() => {
    if (escRef.current !== null) {
      escRef.current.focus()
    }
  }, [escRef])

  useEffect(() => {
    if (!isNotModal) {
      return onCancel
    }
  }, [isNotModal, onCancel])

  useEffect(() => {
    if (dialogElem.current !== null && !dialogElem.current.open) {
      if (isNotModal) {
        dialogElem.current.show()
      } else {
        dialogElem.current.showModal()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isNotModal])

  return createPortal(
    <dialog className={styles.container} ref={dialogElem}>
      <div className={styles.content}>{children}</div>
      <button ref={escRef} onClick={onCancel}>
        [ESC]
      </button>
    </dialog>,
    documentDialog
  )
}

export default Dialog
