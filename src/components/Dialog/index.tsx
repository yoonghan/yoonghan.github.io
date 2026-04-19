import {
	createRef,
	forwardRef,
	useCallback,
	useEffect,
	useImperativeHandle,
	useMemo,
	useState,
} from "react"
import { createPortal } from "react-dom"
import styles from "./Dialog.module.css"
import dialogRootCreator from "./dialogRootCreator"

interface DialogProps {
	isNotModal?: boolean
	onCancel: () => void
	children: React.ReactNode
	nonPortal: boolean
}

export interface DialogHandler {
	close: () => void
}

const Dialog = forwardRef<DialogHandler, DialogProps>(
	function DialogWithHandler(
		{ isNotModal = false, onCancel, children, nonPortal },
		ref,
	) {
		dialogRootCreator.create()
		const dialogElem = createRef<HTMLDialogElement>()
		const documentDialog = document.querySelector("#dialog-root") as Element

		const [showDialog, setShowDialog] = useState(true)

		const close = useCallback(() => {
			setShowDialog(false)
		}, [])

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
		}, [dialogElem, isNotModal])

		const cancel = useCallback(() => {
			close()
			onCancel()
		}, [close, onCancel])

		const onCloseClick = useCallback(() => {
			cancel()
		}, [cancel])

		const onDialogClick = useCallback(() => {
			if (!isNotModal) {
				cancel()
			}
		}, [cancel, isNotModal])

		const onContentClick = useCallback(
			(
				event:
					| React.MouseEvent<HTMLDivElement>
					| React.KeyboardEvent<HTMLDivElement>,
			) => {
				event.stopPropagation()
			},
			[],
		)

		const dialog = useMemo(
			() => (
				<>
					{showDialog && (
						// biome-ignore lint/a11y/useKeyWithClickEvents: expected
						<dialog
							className={styles.container}
							ref={dialogElem}
							onClick={onDialogClick}
						>
							{
								// biome-ignore lint/a11y/useKeyWithClickEvents: expected
								// biome-ignore lint/a11y/noStaticElementInteractions: expected
								<div
									className={styles.content}
									onClick={onContentClick}
								>
									{children}
								</div>
							}
							<button type="button" onClick={onCloseClick}>
								{isNotModal ? "×" : "[ESC]"}
							</button>
						</dialog>
					)}
				</>
			),
			[
				children,
				dialogElem,
				isNotModal,
				onCloseClick,
				onContentClick,
				onDialogClick,
				showDialog,
			],
		)

		return nonPortal ? dialog : createPortal(dialog, documentDialog)
	},
)

export default Dialog