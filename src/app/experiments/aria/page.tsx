import { site } from "@/config/site"
import styles from "./Storybook.module.css"
import { storyBookList } from "@/app/experiments/storybook/config/componentList"

export const metadata = {
  title: "Aria",
  description: "Testing aria",
  alternates: {
    ...site.generateCanonical("/experiments/aria"),
  },
}

function Aria() {
  return (
    <div className={styles.container}>
      <h1>Aria</h1>
      <p>
        Instead of having a dedicated storybook component, we have decided to
        create a simple 1 pager to render whatever we wanted to. In this way, we
        can avoid having to maintain another setup and thing can work straight
        out of the box.
      </p>
    </div>
  )
}

export default Aria
