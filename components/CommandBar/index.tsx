import * as React from "react"
import dynamic from "next/dynamic"
import { CommandBarNoSSRProps } from "./CommandBarNoSSR"

const CommandBarNoSSRComponent = dynamic(() => import("./CommandBarNoSSR"), {
  ssr: false,
  loading: () => <div className="header">Initializing...</div>,
})

const CommandBar = (props: CommandBarNoSSRProps) => {
  return <CommandBarNoSSRComponent {...props} />
}

export default React.memo(CommandBar)
