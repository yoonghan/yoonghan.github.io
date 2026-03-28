import Card from "@/components/Card"
import { memo } from "react"
import ScrollToTop from "@/components/ScrollToTop"
import LetterBox from "@/components/LetterBox"
import { site } from "@/config/site"
import { cards } from "./config"

export const metadata = {
  title: "Lab, Research & Development",
  description: "Experimental projects for Proof of Concept, and UI/UX",
  alternates: {
    ...site.generateCanonical("/experiments"),
  },
}

const Experiments = () => {
  return (
    <div className="walcron-container">
      <h1>Lab, Research & Development</h1>
      <div>
        <p>
          Incomplete or projects that are used for test-beds{" "}
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

export default memo(Experiments)
