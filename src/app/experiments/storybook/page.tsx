/* istanbul ignore file */
import styles from "@/pageComponents/Experiments/Storybook/Storybook.module.css"
import StoryMaker from "@/pageComponents/Experiments/Storybook/StoryMaker"
import { storyBookList } from "@/app/experiments/storybook/config/componentList"

export const metadata = {
  title: "Storybook",
  description: "Layout sandboxing and testing creation.",
}

function Storybook() {
  return (
    <div className={styles.container}>
      <h1>Component Storybook</h1>
      <p>
        Instead of having a dedicated storybook component, we have decided to
        create a simple 1 pager to render whatever we wanted to. In this way, we
        can avoid having to maintain another setup and thing can work straight
        out of the box.
      </p>
      <StoryMaker items={storyBookList} />
    </div>
  )
}

export const config = { runtime: "nodejs" }

export default Storybook
