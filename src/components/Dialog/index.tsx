/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { createRef, useCallback, useEffect } from "react"
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

  const onCloseClick = useCallback(() => {
    if (dialogElem.current !== null) {
      dialogElem.current.close()
    }
  }, [dialogElem])

  const onDialogClick = useCallback(() => {
    if (dialogElem.current !== null && !isNotModal) {
      dialogElem.current.close()
    }
  }, [dialogElem, isNotModal])

  const onContentClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      event.stopPropagation()
    },
    []
  )

  return createPortal(
    <dialog
      className={styles.container}
      ref={dialogElem}
      onClose={onCancel}
      onClick={onDialogClick}
    >
      <div className={styles.content} onClick={onContentClick}>
        {children}
      </div>
      <button onClick={onCloseClick}>{isNotModal ? "×" : "[ESC]"}</button>
    </dialog>,
    documentDialog
  )
}

export default Dialog
