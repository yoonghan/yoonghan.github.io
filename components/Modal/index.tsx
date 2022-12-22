/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/tabindex-no-positive */
import { createRef, useEffect } from "react"
import { createPortal } from "react-dom"
import styles from "./Modal.module.css"
import modalRootCreator from "./modalRootCreator"

interface ModalProps {
  isModal?: boolean
  onCancel: (
    event?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>
  ) => void
  children: React.ReactNode
}

const Modal = ({ isModal = false, onCancel, children }: ModalProps) => {
  modalRootCreator.create()
  const escRef = createRef<HTMLButtonElement>()
  const dialogElem = createRef<HTMLDialogElement>()
  const documentModal = document.querySelector("#modal-root") as Element

  useEffect(() => {
    if (escRef.current !== null) {
      escRef.current.focus()
    }
  }, [escRef])

  useEffect(() => {
    if (!isModal) {
      return onCancel
    }
  }, [isModal, onCancel])

  useEffect(() => {
    if (dialogElem.current !== null && !dialogElem.current.open) {
      if (isModal) {
        dialogElem.current.show()
      } else {
        dialogElem.current.showModal()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModal])

  return createPortal(
    <dialog className={styles.container} ref={dialogElem}>
      <div className={styles.content}>{children}</div>
      <button ref={escRef} onClick={onCancel}>
        [ESC]
      </button>
    </dialog>,
    documentModal
  )
}

export default Modal
