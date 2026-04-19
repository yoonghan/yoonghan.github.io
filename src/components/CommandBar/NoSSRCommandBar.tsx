/**
  A command prompt input
  **/

import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import styles from "./CommandBar.module.css"
import CommandBarInput from "./CommandBarInput/CommandBarInput"
import { exec } from "./ExecuteCommand"

const NoSSRCommandBar = () => {
	const router = useRouter()
	const currentPath = usePathname()
	const [suggestedInput, setSuggestedInput] = useState("")
	const [renderExecutedCommand, setRenderExecutedCommand] =
		useState<React.ReactNode>()

	const elem = document.createElement("div")

	useEffect(() => {
		document.body.appendChild(elem)

		return () => {
			queueMicrotask(() => {
				/* istanbul ignore next */
				if (elem !== null && document.body.contains(elem)) {
					elem.remove()
				}
			})
		}
	}, [elem])

	const cancelExecutedCommand = () => {
		setRenderExecutedCommand(null)
	}

	const inputCallback = (suggestedInput: string) => {
		setSuggestedInput(suggestedInput)
	}

	const handleSubmit = (
		event: React.SubmitEvent<HTMLFormElement>,
		typedInput: string,
	) => {
		event.preventDefault()

		setRenderExecutedCommand(
			exec(
				elem,
				cancelExecutedCommand,
				router,
				currentPath,
				inputCallback,
			)(typedInput),
		)
	}

	return (
		<div className={styles.container}>
			<CommandBarInput
				onSuggestedInputCallback={inputCallback}
				onBlurCallback={() => {}}
				onFocusCallback={() => {}}
				onSubmitCallback={handleSubmit}
				suggestedInput={suggestedInput}
			/>
			{renderExecutedCommand}
		</div>
	)
}

export default NoSSRCommandBar