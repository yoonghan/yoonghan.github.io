import { ReactNode } from "react"
import ScrollToTop from "@/components/ScrollToTop"
import Table from "@/components/Table"
import { TroubleshootPwaCheckList, CronJobCheckList } from "./Checklist"
import wrapPromise from "@/components/utils/common/wrapPromise"
import { site } from "@/config/site"

export const metadata = {
  title: "Checklist",
  description: "Important Checklist to ensure website runs well and good",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
  alternates: {
    ...site.generateCanonical("/projects/checklist"),
  },
}

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
  {
    Site: "WebAim Wave",
    Description: "Similar to lighthouse",
    Url: (
      <a
        href="https://wave.webaim.org/report#/https://www.walcron.com"
        target={"_blank"}
        rel="noreferrer"
      >
        link
      </a>
    ),
  },
]

const checklistLoader = wrapPromise<undefined>(
  new Promise((resolve) => resolve(undefined))
)

const CheckList = () => {
  const postedCronJob = checklistLoader.read()

  return (
    <div className="mx-auto max-w-screen-lg px-4 pb-8">
      <h1 className="py-8">Important Checklist Links</h1>
      <span>A checklist of important links to test and for reference.</span>
      <span>
        Note: Page is not robot indexed and viewable only by desktop. May change
        only in future.
      </span>
      <br />
      <br />
      <TroubleshootPwaCheckList />
      <br />
      <br />
      <CronJobCheckList postedJob={postedCronJob} />
      <br />
      <br />
      <Table headers={["Site", "Description", "Url"]} list={links} />
      <ScrollToTop />
    </div>
  )
}

export default CheckList
