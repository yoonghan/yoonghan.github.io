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
  const dialogContainerRef = createRef<HTMLDivElement>()
  const escRef = createRef<HTMLButtonElement>()
  const documentBody = document.body
  const documentModal = document.querySelector("#modal-root") as Element

  useEffect(() => {
    const keyListenerEvent = (evt: KeyboardEvent) => {
      if (evt.key === "esc" || evt.key === "Escape") {
        onCancel()
      }
    }

    if (escRef.current !== null) {
      escRef.current.focus()
    }

    documentBody.addEventListener("keyup", keyListenerEvent)

    return () => {
      documentBody.removeEventListener("keyup", keyListenerEvent)
    }
  }, [documentBody, escRef, onCancel])

  const onContainerClick = (
    event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>
  ) => {
    if (!isModal && event.target === dialogContainerRef?.current) {
      onCancel(event)
    }
  }

  return createPortal(
    <div
      role={"dialog"}
      className={styles.container}
      onClick={onContainerClick}
      onKeyUp={onContainerClick}
      ref={dialogContainerRef}
      tabIndex={-1}
    >
      <div className={styles.content}>{children}</div>
      <button ref={escRef} onClick={onCancel} tabIndex={1}>
        [ESC]
      </button>
    </div>,
    documentModal
  )
}

export default Modal
