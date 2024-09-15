import Card from "@/components/Card"
import { memo } from "react"
import ScrollToTop from "@/components/ScrollToTop"
import LetterBox from "@/components/LetterBox"
import { site } from "@/config/site"
import { cards } from "./config"

export const metadata = {
  title: "Experiments",
  description: "Experimental pages for POC, and UI/UX",
  alternates: {
    ...site.generateCanonical("/experiments"),
  },
}

const Experiments = ({}) => {
  return (
    <div className="p-8 h-screen">
      <div className="mx-auto max-w-screen-lg px-4 pb-8">
        <h1>Experimental projects</h1>
        <div>
          <p>
            Incomplete or projects that are used for test-beds
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

export default memo(Experiments)
