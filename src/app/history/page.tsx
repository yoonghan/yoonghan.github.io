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

const History = () => {
  return (
    <div className="walcron-container">
      <h1>Site&apos;s history</h1>
      <section>
        <h2 className="text-xl">Improvement Timeline</h2>
        <p className="pb-4">Historical timeline of Walcron site since 2014.</p>
        <Timeline events={siteHistory} />
      </section>
      <section>
        <h3 className="text-xl pb-4 pt-8">Motivational books</h3>
        <Table list={nonFictionBooks} headers={["Book title", "Learnt"]} />
      </section>
      <ScrollToTop />
    </div>
  )
}

export default memo(History)
