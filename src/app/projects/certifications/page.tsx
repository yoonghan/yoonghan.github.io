import { memo } from "react"
import ScrollToTop from "@/components/ScrollToTop"

import { site } from "@/config/site"
import { AwsCloudPractitionerArticle } from "./config/AwsCloudPractitionerArticle"
import { SunJavaDeveloperArticle } from "./config/SunJavaDeveloperArticle"
import { ScalaFunctionalProgrammingArticle } from "./config/ScalaFunctionalProgrammingArticle"
import { AwsSolutionArchitectArticle } from "./config/AwsSolutionArchitectArticle"
import { NpmCommands } from "./config/NpmCommands"
import { AIPractitioner } from "./config/AIPractitioner"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Learning",
  description: "Certification and thing learnt.",
  alternates: {
    ...site.generateCanonical("/projects/learning"),
  },
}

const Learning = () => {
  return (
    <div className="walcron-container">
      <h1>Certification</h1>
      <p className="mb-8">
        Having taken some certifications over the years, I've decided to put them here for reference.
        I'm not a big fan of certifications, but they are a good way to structure my learning and ensure I cover the fundamentals.
      </p>
      <section className="grid grid-column gap-4">
        <AIPractitioner />
        <AwsSolutionArchitectArticle />
        <AwsCloudPractitionerArticle />
        <SunJavaDeveloperArticle />
        <ScalaFunctionalProgrammingArticle />
        <NpmCommands />
      </section>
      <ScrollToTop />
    </div>
  )
}

export default memo(Learning)
