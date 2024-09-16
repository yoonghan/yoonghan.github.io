import { site } from "@/config/site"
import StoryMaker from "./StoryMaker"
import { storyBookList } from "@/app/experiments/storybook/config/componentList"

export const metadata = {
  title: "Storybook",
  description: "Layout sandboxing and testing creation.",
  alternates: {
    ...site.generateCanonical("/experiments/storybook"),
  },
}

function Storybook() {
  return (
    <div>
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

export default Storybook
