import CommandBar from "@/components/CommandBar"
import Footer from "@/components/Footer"
import HtmlHead from "@/components/HtmlHead"
import Head from "next/head"
import { memo, ReactNode } from "react"
import ScrollToTop from "@/components/ScrollToTop"
import styles from "@/pageComponents/Projects/Projects.module.css"
import Table from "@/components/Table"
import TroubleshootPwaCheckList from "@/pageComponents/Projects/Checklist"

const links: Array<{ [key: string]: ReactNode }> = [
  {
    Site: "Google Search Console",
    Description: "Check site usability and update search sitemap",
    Url: (
      <a
        href="https://search.google.com/search-console"
        target={"_blank"}
        rel="noreferrer"
      >
        link
      </a>
    ),
  },
  {
    Site: "Page Speed",
    Description: "Alternative to lighthouse, check page performance",
    Url: (
      <a
        href="https://pagespeed.web.dev/report?url=https%3A%2F%2Fwww.walcron.com%2F"
        target={"_blank"}
        rel="noreferrer"
      >
        link
      </a>
    ),
  },
  {
    Site: "Page Validator",
    Description: "Page validator",
    Url: (
      <a
        href="https://validator.w3.org/nu/?doc=https%3A%2F%2Fwww.walcron.com%2F"
        target={"_blank"}
        rel="noreferrer"
      >
        link
      </a>
    ),
  },
]

const ImportantLinks = ({}) => {
  return (
    <>
      <HtmlHead
        title={"Checklist"}
        description={"Important Checklist to ensure website runs well and good"}
      />
      <Head>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <div>
        <CommandBar />
      </div>
      <div className={`${styles.container}`}>
        <div className={`page-aligned-container`}>
          <h1 className="title">Important Checklist Links</h1>
          <span>A checklist of important links to test and for reference.</span>
          <span>
            Note: Page is not robot indexed and viewable only by desktop. May
            change only in future.
          </span>
          <br />
          <br />
          <TroubleshootPwaCheckList />
          <br />
          <br />
          <Table headers={["Site", "Description", "Url"]} list={links} />
        </div>
        <Footer />
        <ScrollToTop />
      </div>
    </>
  )
}

export default memo(ImportantLinks)
