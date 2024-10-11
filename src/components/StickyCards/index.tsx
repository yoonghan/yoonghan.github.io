import { ScrollableCard } from "@yoonghan/walcron-microfrontend-shared"
import "@yoonghan/walcron-microfrontend-shared/dist/style.css"
import styles from "./scrollable.module.css"
import { ReactNode } from "react"

function StickyCards({ contents }: { contents: ReactNode[] }) {
  return (
    <ScrollableCard
      model={contents.map((content) => ({
        content,
      }))}
      className={styles.container}
    ></ScrollableCard>
  )
}

export default StickyCards
