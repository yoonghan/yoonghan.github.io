import { createRef, useEffect } from "react"
import { createPortal } from "react-dom"
import styles from "./Dialog.module.css"
import dialogRootCreator from "./dialogRootCreator"

interface DialogProps {
  isNotModal?: boolean
  onCancel: () => void
  children: React.ReactNode
}

const Dialog = ({ isNotModal = false, onCancel, children }: DialogProps) => {
  dialogRootCreator.create()
  const dialogElem = createRef<HTMLDialogElement>()
  const documentDialog = document.querySelector("#dialog-root") as Element

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

  const onCloseClick = () => {
    if (dialogElem.current !== null) {
      dialogElem.current.close()
    }
  }

  return createPortal(
    <dialog className={styles.container} ref={dialogElem} onClose={onCancel}>
      <div className={styles.content}>{children}</div>
      <button onClick={onCloseClick} tabIndex={0}>
        {isNotModal ? "×" : "[ESC]"}
      </button>
    </dialog>,
    documentDialog
  )
}

export default Dialog
