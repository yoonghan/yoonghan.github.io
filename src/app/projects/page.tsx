import Card from "@/components/Card"
import { memo } from "react"
import ScrollToTop from "@/components/ScrollToTop"
import styles from "./Projects.module.css"
import LetterBox from "@/components/LetterBox"
import { cards } from "./config"

const Projects = ({}) => {
  return (
    <div className={`${styles.container}`}>
      <div className={`page-aligned-container`}>
        <h1 className="title">Playground projects</h1>
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
