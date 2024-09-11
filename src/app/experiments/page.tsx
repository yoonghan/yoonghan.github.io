import Card from "@/components/Card"
import { memo } from "react"
import ScrollToTop from "@/components/ScrollToTop"
import LetterBox from "@/components/LetterBox"
import { site } from "@/config/site"

export const metadata = {
  title: "Experiments",
  description: "Experimental pages for POC, and UI/UX",
  alternates: {
    ...site.generateCanonical("/experiments"),
  },
}

const Experiments = ({}) => {
  return (
    <div className="p-8">
      <div className="mx-auto max-w-screen-lg px-4 pb-8">
        <h1>Experimental projects</h1>
        <div>
          <p>
            Incomplete or projects that are used for test-beds
            <small>(due to migration most are not moved over)</small>
          </p>
          <Card
            cards={[
              {
                id: "amp",
                title: "Accelerated Mobile Pages",
                description: "Google's approach of fast mobile page.",
                href: "/experiments/amp",
                target: "_self",
              },
              {
                id: "storybook",
                title: "Storybook",
                description: "Design and styling of UX/UI of Walcron page.",
                href: "/experiments/storybook",
                target: "_self",
              },
              {
                id: "performance",
                title: "Performance",
                description: "Validate react performance",
                href: "/experiments/performance",
                target: "_self",
              },
            ]}
          />
        </div>
      </div>
      <hr />
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

export default memo(Experiments)
