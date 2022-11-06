import * as React from "react"
import NavMenu from "./NavMenu"
import Logo from "../Logo"
import NoSSRMobileMenu from "./NoSSRMobileMenu"
import styles from "./CommandBar.module.css"
import dynamic from "next/dynamic"

export interface CommandBarNoSSRProps {
  disableMobile?: boolean
  commandPromptOnly?: boolean
}

const NoSSRCommandBar = dynamic(() => import("./NoSSRCommandBar"), {
  ssr: false,
  loading: () => (
    <div style={{ fontFamily: "Inconsolata", color: "green" }}>
      Loading Shell command...
    </div>
  ),
})

const CommandBar = ({
  disableMobile,
  commandPromptOnly,
}: CommandBarNoSSRProps) => {
  return (
    <div
      className={`${styles["header"]} ${
        commandPromptOnly ? styles["commandPromptOnly"] : ""
      }`}
      id="commandbar"
    >
      <div
        className={
          (!commandPromptOnly ? styles["desktop"] : "") +
          " " +
          (!disableMobile && !commandPromptOnly ? styles["shift-to-right"] : "")
        }
      >
        <NoSSRCommandBar />
        {!disableMobile && !commandPromptOnly && <NavMenu />}
      </div>
      {!disableMobile && !commandPromptOnly && (
        <div className={styles["mobile"]}>
          <NoSSRMobileMenu />
        </div>
      )}
      {disableMobile && <Logo />}
    </div>
  )
}

export default React.memo(CommandBar)
