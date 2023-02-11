import * as React from "react"
import styles from "./CommandBar.module.css"
import dynamic from "next/dynamic"
import NavMenu from "./NavMenu"

export interface CommandBarNoSSRProps {
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

const CommandBar = ({ commandPromptOnly }: CommandBarNoSSRProps) => {
  return (
    <div
      className={`${styles["header"]} ${
        commandPromptOnly ? styles["commandPromptOnly"] : ""
      }`}
      id="commandbar"
    >
      <div
        className={
          !commandPromptOnly
            ? `${styles["desktop"]} ${styles["shift-to-right"]}`
            : ""
        }
      >
        <NoSSRCommandBar />
        {!commandPromptOnly && (
          <div className={styles.menu}>
            <NavMenu />
          </div>
        )}
      </div>
    </div>
  )
}

export default React.memo(CommandBar)
