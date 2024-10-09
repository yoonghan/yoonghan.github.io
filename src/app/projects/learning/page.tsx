import { memo } from "react"
import ScrollToTop from "@/components/ScrollToTop"

//Images
import { site } from "@/config/site"

export const metadata = {
  title: "Learning",
  description: "Certification and thing learnt.",
  alternates: {
    ...site.generateCanonical("/projects/learning"),
  },
}

const Learning = ({}) => {
  return (
    <div className="walcron-container">
      <h1>Lessons learned from projects</h1>
      <span>What certification we have learned and taken.</span>
      <ScrollToTop />
    </div>
  )
}

export default memo(Learning)
