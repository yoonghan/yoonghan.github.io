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
    <div className="walcron-container">
      <h1>Site&apos;s history</h1>
      <section>
        <h2 className="text-left">Improvement Timeline</h2>
        <Timeline events={siteHistory} />
      </section>
      <section>
        <h2 className="text-left">Motivational books</h2>
        <Table list={nonFictionBooks} headers={["Book title", "Learnt"]} />
      </section>
      <ScrollToTop />
    </div>
  )
}

export default memo(History)
