/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import {
  createRef,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from "react"
import { createPortal } from "react-dom"
import styles from "./Dialog.module.css"
import dialogRootCreator from "./dialogRootCreator"

interface DialogProps {
  isNotModal?: boolean
  onCancel: () => void
  children: React.ReactNode
}

export interface DialogHandler {
  close: () => void
}

const Dialog = forwardRef<DialogHandler, DialogProps>(
  function DialogWithHandler({ isNotModal = false, onCancel, children }, ref) {
    dialogRootCreator.create()
    const dialogElem = createRef<HTMLDialogElement>()
    const documentDialog = document.querySelector("#dialog-root") as Element

    const [showDialog, setShowDialog] = useState(true)

    const close = useCallback(() => {
      if (dialogElem.current !== null) {
        setShowDialog(false)
      }
    }, [dialogElem])

    useImperativeHandle(ref, () => {
      return {
        close,
      }
    })

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

    const _onCancel = useCallback(() => {
      setShowDialog(false)
      onCancel()
    }, [onCancel])

    return createPortal(
      <>
        {showDialog && (
          <dialog
            className={styles.container}
            ref={dialogElem}
            onClose={_onCancel}
            onClick={onDialogClick}
          >
            <div className={styles.content} onClick={onContentClick}>
              {children}
            </div>
            <button onClick={_onCancel}>{isNotModal ? "×" : "[ESC]"}</button>
          </dialog>
        )}
      </>,
      documentDialog
    )
  }
)

export default Dialog
