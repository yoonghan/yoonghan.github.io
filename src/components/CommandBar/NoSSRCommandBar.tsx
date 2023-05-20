/**
  A command prompt input
  **/

import * as React from "react"
import CommandBarInput from "./CommandBarInput/CommandBarInput"
import { exec } from "./ExecuteCommand"
import styles from "./CommandBar.module.css"
import { usePathname, useRouter } from "next/navigation"

const NoSSRCommandBar = () => {
  const router = useRouter()
  const currentPath = usePathname()
  const [suggestedInput, setSuggestedInput] = React.useState("")
  const [renderExecutedCommand, setRenderExecutedCommand] = React.useState(
    <React.Fragment />
  )
  let elem: HTMLDivElement = React.useMemo(
    () => document.createElement("div"),
    []
  )

  React.useEffect(() => {
    document.body.appendChild(elem)

    return () => {
      //document.body.removeChild(elem)
    }
  }, [elem])

  const cancelExecutedCommand = () => {
    setRenderExecutedCommand(<React.Fragment />)
  }

  const inputCallback = (suggestedInput: string) => {
    setSuggestedInput(suggestedInput)
  }

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>,
    typedInput: string
  ) => {
    event.preventDefault()

    setRenderExecutedCommand(
      exec(
        elem,
        cancelExecutedCommand,
        router,
        currentPath,
        inputCallback
      )(typedInput)
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
