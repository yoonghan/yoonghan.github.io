import Footer from "@/components/Footer"
import Head from "next/head"
import HeaderOne from "@/components/HeaderOne"
import HtmlHead from "@/components/HtmlHead"
import Timeline from "@/components/Timeline"
import Table from "@/components/Table"
import { nonFictionBooks, siteHistory } from "@/pageComponents/History/config"
import { memo } from "react"
import ScrollToTop from "@/components/ScrollToTop"
import Menu from "@/components/Menu"

const History = ({}) => {
  return (
    <>
      <HtmlHead
        title={"Walcron History"}
        description={
          "Site history and External knowledge and things I worked on."
        }
      />
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.6.1/css/all.min.css"
        />
      </Head>
      <Menu />
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
      <Footer />
    </>
  )
}

export default memo(History)
