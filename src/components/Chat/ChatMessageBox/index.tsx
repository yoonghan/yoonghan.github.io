import { faPaperclip } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
	forwardRef,
	type SubmitEvent,
	useImperativeHandle,
	useRef,
	useState,
} from "react"
import { useDropzone } from "react-dropzone"
import ConfirmationDialog from "@/components/Dialog/ConfirmationDialog"
import { useDialogCreation } from "@/components/Dialog/useDialogCreation/useDialogCreation"
import { site } from "@/config/site"
import Button from "../../Button"
import TextArea from "../../Input/TextArea"
import { MessageType } from "../config/MessageType"
import styles from "./ChatMessageBox.module.css"
import ChatMessageDialog, {
	type MessageHandler,
	userId,
} from "./ChatMessageDialog"
import "../react-chat-bell.css"

interface Props {
	onMessageSend: (message: string, messageType: MessageType) => void
	noRef?: boolean
}

export const apiUrl = `${site.apiUrl}/firebase`

const dropFile =
	(callback: (message: string, notifyReceipient?: boolean) => void) =>
		(acceptedFiles: File[]) => {
			const formData = new FormData()
			formData.append("file", acceptedFiles[0])

			callback(`Uploading file ${acceptedFiles[0].name}...`)

			fetch(apiUrl, {
				method: "POST",
				body: formData,
			})
				.then((resp) => resp.json())
				.then((data) => {
					if (data.status === "ok") {
						callback(`${data.data}`, true)
					} else {
						callback(`File upload failed`)
					}
				})
				.catch((err) => {
					callback(`File upload failed, (${err})`)
				})
		}

const ChatMessageBox = forwardRef<MessageHandler, Props>(
	function ChatMessageDialogWithMessageHandler(
		{ onMessageSend, noRef = false },
		ref,
	) {
		const confirm = useDialogCreation(ConfirmationDialog)
		const chatMessageDialogRef = useRef<MessageHandler>(null)
		const [message, setMessage] = useState("")

		const sendMessage = (e?: Event | SubmitEvent) => {
			e?.preventDefault()
			if (chatMessageDialogRef.current !== null && message !== "") {
				chatMessageDialogRef.current.addMessage(userId, message)
				onMessageSend(message, MessageType.TEXT)
			}
			setMessage("")
		}

		const sendFileMessage = (message: string, notifyReceipient = false) => {
			chatMessageDialogRef.current?.addMessage(undefined, message)
			if (notifyReceipient) onMessageSend(message, MessageType.FILE)
		}

		const dropFileWithMessage = dropFile(sendFileMessage)

		const onDrop = (acceptedFiles: File[]) => {
			const filesToUpload = acceptedFiles
			if (inputRef.current) {
				inputRef.current.value = ""
			}
			confirm({
				title: "Upload File",
				onYesClick: () => {
					filesToUpload && dropFileWithMessage(filesToUpload)
				},
				message: "This file will be shared publicly. Are you sure?",
				nonPortal: true,
			})
		}

		const { getRootProps, getInputProps, inputRef } = useDropzone({
			onDrop,
		})

		useImperativeHandle(ref, () => {
			return {
				addMessage(
					senderId: number | undefined,
					message: string,
					messageType?: MessageType,
				) {
					chatMessageDialogRef.current?.addMessage(
						senderId,
						message,
						messageType,
					)
				},
			}
		})

		return (
			<div className={styles.container}>
				<ChatMessageDialog ref={noRef ? null : chatMessageDialogRef} />
				<br />
				<form
					action=""
					onSubmit={sendMessage}
					{...getRootProps({
						onClick: (event) => event.stopPropagation(),
					})}
				>
					<fieldset>
						<label htmlFor="message">Message: </label>
						<br />
						<TextArea
							onChange={(event) => {
								setMessage(event.target.value)
							}}
							onSubmit={sendMessage}
							value={message}
							additionalProps={{
								id: "message",
								placeholder: "Your Message",
								rows: 5,
							}}
						/>
						<hr />

						<label htmlFor="file-upload">Upload File: </label>
						<input
							{...getInputProps()}
							id="file-upload"
							data-testid="file-uploader"
						/>
						<button
							type="button"
							id="file-upload-btn"
							aria-label="Upload"
							onClick={() => {
								if (inputRef.current) {
									inputRef.current.click()
								}
							}}
						>
							<FontAwesomeIcon icon={faPaperclip} />
						</button>
					</fieldset>
					<Button additionalProps={{ type: "submit" }} color="grey">
						Send
					</Button>
				</form>
			</div>
		)
	},
)

export default ChatMessageBox