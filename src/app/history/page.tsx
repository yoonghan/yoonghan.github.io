import HeaderOne from "@/components/HeaderOne"
import Timeline from "@/components/Timeline"
import Table from "@/components/Table"
import { nonFictionBooks, siteHistory } from "@/app/history/config"
import { memo } from "react"
import ScrollToTop from "@/components/ScrollToTop"

const History = ({}) => {
  return (
    <>
      <div className={"page-aligned-container"}>
        <HeaderOne title={"Site's history"} isLined={true} />
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
