import { findPageByPath } from "@/config/pages"
import * as React from "react"
import { createPortal } from "react-dom"
import HelpDialog from "../HelpDialog"
import PwaEnabler from "../PwaEnabler"
import InvalidCommand from "./InvalidCommand"
import Output from "./Output"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"

export enum EnumAction {
  COMMAND,
  LINK,
}

interface ICommand {
  [s: string]: IAvailableInput
}

export interface IAvailableInput {
  action: EnumAction
  description: string
  url?: string
  exec: any
  synonym?: Array<string>
}

const generateLink = (url: string) => ({
  action: EnumAction.LINK,
  exec: (router: any, path: string) => {
    const link = findPageByPath(url)?.path
    if (path === link) {
      return <InvalidCommand invalidCommand={"This is the page"} />
    }
    router.push(link)
    return <React.Fragment />
  },
})

export const AvailableInput: ICommand = {
  whoami: {
    synonym: ["cd about", "cd /about"],
    description: "Get to know this site.",
    ...generateLink("/about"),
  },
  "su - walcron": {
    synonym: ["sudo su", "sudo walcron", "su -", "sudo su -"],
    description: "Know us by being us.",
    ...generateLink("/about"),
  },
  pwd: {
    description: "Lost, and need direction.",
    action: EnumAction.LINK,
    exec: (_router: any, pathname: string | null) => {
      return <Output output={pathname || "/"} />
    },
  },
  ls: {
    synonym: [
      "dir",
      "cd listing",
      "cd /listing",
      "cd projects",
      "cd /projects",
    ],
    description: "What's there ?",
    ...generateLink("/projects"),
  },
  history: {
    synonym: ["cd /history", "cd history"],
    description: "Walcron development history.",
    ...generateLink("/history"),
  },
  exit: {
    synonym: ["cd", "cd /"],
    description: "Return to main page.",
    action: EnumAction.LINK,
    exec: (router: AppRouterInstance, pathname: string) => {
      if (pathname === "/") {
        return <InvalidCommand invalidCommand={"Already at root"} />
      }
      router.push("/")
      return <React.Fragment />
    },
  },
  "cd ..": {
    description: "Return to previous page.",
    action: EnumAction.LINK,
    exec: (router: AppRouterInstance, pathname: string) => {
      if (pathname !== "/") {
        router.back()
        return <React.Fragment />
      } else return <InvalidCommand invalidCommand={"Already at root"} />
    },
  },
  "=": {
    description: "Do Math.",
    action: EnumAction.COMMAND,
    exec: () => <InvalidCommand invalidCommand={"Provide an equation"} />,
  },
  share: {
    description: "Spread our website!",
    synonym: ["twitter", "whatsapp", "facebook"],
    action: EnumAction.COMMAND,
    exec: () => {
      if (navigator.share) {
        navigator.share({
          title: "Walcron",
          text: "An awesome website.",
          url: "https://www.walcron.com",
        })
        return <React.Fragment />
      } else {
        return <InvalidCommand invalidCommand={"Couldn't run HTML5 share."} />
      }
    },
  },
  help: {
    description: "Lost, confused, need help.",
    synonym: ["man", "info"],
    action: EnumAction.COMMAND,
    exec: (
      element: HTMLDivElement,
      cancellationCallback: () => void,
      specialInputCallback: (input: string) => void
    ) => {
      return createPortal(
        <HelpDialog
          onCancel={cancellationCallback}
          specialInputCallback={specialInputCallback}
        />,
        element
      )
    },
  },
  pwa: {
    description: "Enable PWA",
    synonym: ["offline"],
    action: EnumAction.COMMAND,
    exec: (element: HTMLDivElement, cancellationCallback: () => void) => {
      return createPortal(
        <PwaEnabler onCancel={cancellationCallback} />,
        element
      )
    },
  },
}
