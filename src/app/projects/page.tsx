import Card from "@/components/Card"
import { memo } from "react"
import ScrollToTop from "@/components/ScrollToTop"
import LetterBox from "@/components/LetterBox"
import { cards } from "./config"
import { site } from "@/config/site"

export const metadata = {
  title: "Projects",
  description: "Playground projects that we had been working on.",
  alternates: {
    ...site.generateCanonical("/projects"),
  },
}

const Projects = ({}) => {
  return (
    <div className="p-8">
      <div className="mx-auto max-w-screen-lg px-4 pb-8">
        <h1>Playground projects</h1>
        <div>
          <p>
            Projects that we are working on{" "}
            <small>(due to migration most are not moved over)</small>
          </p>
          <Card cards={cards} />
        </div>
      </div>
      <LetterBox />
      <ScrollToTop />
    </div>
  )
}

export default memo(Projects)
