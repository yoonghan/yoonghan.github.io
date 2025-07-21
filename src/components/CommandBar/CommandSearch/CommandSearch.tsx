import { findPageByPath } from "@/config/pages"
import * as React from "react"
import { createPortal } from "react-dom"
import PwaEnabler from "../PwaEnabler"
import InvalidCommand from "./InvalidCommand"
import Output from "./Output"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import { site } from "@/config/site"
import { redirectTo } from "@/util/location"

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
    return <></>
  },
})

export const AvailableInput: ICommand = {
  whoami: {
    synonym: ["cd about", "cd /about"],
    description: "About Walcron.",
    ...generateLink("/about"),
  },
  "su - walcron": {
    synonym: ["sudo su", "sudo walcron", "su -", "sudo su -"],
    description: "Know us by being us.",
    ...generateLink("/about"),
  },
  pwd: {
    description: "Print current path.",
    action: EnumAction.LINK,
    exec: (_router: any, pathname: string | null) => {
      return <Output output={pathname ?? "/"} />
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
    description: "List projects.",
    ...generateLink("/projects"),
  },
  history: {
    synonym: ["cd /history", "cd history"],
    description: "Page timeline.",
    ...generateLink("/history"),
  },
  exit: {
    synonym: ["cd", "cd /"],
    description: "Goto Home.",
    action: EnumAction.LINK,
    exec: (router: AppRouterInstance, pathname: string) => {
      if (pathname === "/") {
        return <InvalidCommand invalidCommand={"Already at root"} />
      }
      router.push("/")
      return <></>
    },
  },
  "cd ..": {
    description: "Goto Previous.",
    action: EnumAction.LINK,
    exec: (router: AppRouterInstance, pathname: string) => {
      if (pathname !== "/") {
        router.back()
        return <></>
      } else return <InvalidCommand invalidCommand={"Already at root"} />
    },
  },
  "=": {
    description: "Do Maths.",
    action: EnumAction.COMMAND,
    exec: () => <InvalidCommand invalidCommand={"Provide an equation"} />,
  },
  share: {
    description: "Spread Love!",
    synonym: ["twitter", "whatsapp", "facebook"],
    action: EnumAction.COMMAND,
    exec: () => {
      if (navigator.share) {
        navigator.share({
          title: "Walcron",
          text: "An awesome website.",
          url: site.url,
        })
        return <></>
      } else {
        return <InvalidCommand invalidCommand={"Couldn't run HTML5 share."} />
      }
    },
  },
  pwa: {
    description: "Enable PWA",
    synonym: ["offline"],
    action: EnumAction.COMMAND,
    exec: (element: HTMLDivElement, cancellationCallback: () => void) => {
      return createPortal(
        <PwaEnabler onCancel={cancellationCallback} />,
        element,
      )
    },
  },
  "no-animate": {
    description: "Disable animation",
    synonym: ["no animate", "stop animate"],
    action: EnumAction.LINK,
    exec: (_: AppRouterInstance, pathname: string) => {
      redirectTo(pathname + "?animate=none")
      return <></>
    },
  },
}
