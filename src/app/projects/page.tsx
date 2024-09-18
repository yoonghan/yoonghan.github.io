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
    <div className="mx-auto max-w-screen-lg px-4 pb-20">
      <h1 className="py-8">Playground projects</h1>
      <div>
        <p>
          Projects that we are working on{" "}
          <small>(due to migration most are not moved over)</small>
        </p>
        <Card cards={cards} />
      </div>

      <hr />
      <div className="py-8">
        <LetterBox />
      </div>
      <ScrollToTop />
    </div>
  )
}

export default memo(Projects)
