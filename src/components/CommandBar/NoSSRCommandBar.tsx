/**
  A command prompt input
  **/

import * as React from "react"
import { withRouter } from "next/router"
import { WithRouterProps } from "next/dist/client/with-router"
import CommandBarInput from "./CommandBarInput/CommandBarInput"
import { exec } from "./ExecuteCommand"
import styles from "./CommandBar.module.css"

export interface NoSSRCommandBarProps extends WithRouterProps {}

const NoSSRCommandBar = (props: NoSSRCommandBarProps) => {
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
      document.body.removeChild(elem)
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
      exec(elem, cancelExecutedCommand, props.router, inputCallback)(typedInput)
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

export default withRouter(NoSSRCommandBar)
