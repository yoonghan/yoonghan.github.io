import Timeline from "@/components/Timeline"
import Table from "@/components/Table"
import { nonFictionBooks, siteHistory } from "@/app/history/config"
import { memo } from "react"
import ScrollToTop from "@/components/ScrollToTop"
import { site } from "@/config/site"

export const metadata = {
  title: "Website History",
  description: "Timeline and journey of the page.",
  alternates: {
    ...site.generateCanonical("/history"),
  },
}

const History = ({}) => {
  return (
    <>
      <div className={"page-aligned-container"}>
        <h1 className="py-8">Site&apos;s history</h1>
        <section>
          <h2 className="text-align-left">Improvement Timeline</h2>
          <Timeline events={siteHistory} />
        </section>
        <section>
          <h2 className="text-align-left">Motivational books</h2>
          <Table list={nonFictionBooks} headers={["Book title", "Learnt"]} />
        </section>
        <div className={"pb-5"}></div>
        <ScrollToTop />
      </div>
    </>
  )
}

export default memo(History)
