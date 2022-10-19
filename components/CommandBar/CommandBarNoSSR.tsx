import * as React from "react"
import NavMenu from "./NavMenu"
import Logo from "../Logo"
import NoSSRCommandBar from "./NoSSRCommandBar"
import NoSSRMobileMenu from "./NoSSRMobileMenu"
import styles from "./CommandBar.module.css"

export interface CommandBarNoSSRProps {
  disableMobile?: boolean
  commandPromptOnly?: boolean
}

const CommandBarNoSSR = ({
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

export default CommandBarNoSSR
