import Card from "@/components/Card"
import { memo } from "react"
import ScrollToTop from "@/components/ScrollToTop"
import styles from "./Projects.module.css"
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
    <div className={`${styles.container}`}>
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
      <section>
        <h2>Contact</h2>
        <div className="p-padding center">
          <LetterBox />
        </div>
      </section>
      <ScrollToTop />
    </div>
  )
}

export default memo(Projects)
