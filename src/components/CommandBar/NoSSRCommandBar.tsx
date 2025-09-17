/**
  A command prompt input
  **/

import { useState, useEffect } from "react"
import CommandBarInput from "./CommandBarInput/CommandBarInput"
import { exec } from "./ExecuteCommand"
import styles from "./CommandBar.module.css"
import { usePathname, useRouter } from "next/navigation"

const NoSSRCommandBar = () => {
  const router = useRouter()
  const currentPath = usePathname()
  const [suggestedInput, setSuggestedInput] = useState("")
  const [renderExecutedCommand, setRenderExecutedCommand] = useState(<></>)

  const elem = document.createElement("div")

  useEffect(() => {
    document.body.appendChild(elem)

    return () => {
      queueMicrotask(() => {
        /* istanbul ignore next */
        if (elem !== null && document.body.contains(elem)) {
          document.body.removeChild(elem)
        }
      })
    }
  }, [elem])

  const cancelExecutedCommand = () => {
    setRenderExecutedCommand(<></>)
  }

  const inputCallback = (suggestedInput: string) => {
    setSuggestedInput(suggestedInput)
  }

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>,
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
