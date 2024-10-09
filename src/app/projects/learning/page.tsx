import { memo } from "react"
import ScrollToTop from "@/components/ScrollToTop"

import { site } from "@/config/site"
import { AwsCloudPractitionerArticle } from "./config/AwsCloudPractitionerArticle"
import { SunJavaDeveloperArticle } from "./config/SunJavaDeveloperArticle"
import { ScalaFunctionalProgrammingArticle } from "./config/ScalaFunctionalProgrammingArticle"

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
      <h1>Certification taken</h1>
      <section className="grid grid-column gap-4">
        <AwsCloudPractitionerArticle />
        <SunJavaDeveloperArticle />
        <ScalaFunctionalProgrammingArticle />
      </section>
      <ScrollToTop />
    </div>
  )
}

export default memo(Learning)
