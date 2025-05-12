import { Fragment, memo, useMemo } from "react"
import ScrollToTop from "@/components/ScrollToTop"
import Link from "@/components/Link"
import { Result, SiteMapConstructor } from "./sitemapConstructor"
import { sortedSiteMapPages } from "@/config/pages"
import { site } from "@/config/site"

export const metadata = {
  title: "Sitemap",
  description: "Website links and site.",
  alternates: {
    ...site.generateCanonical("/sitemap"),
  },
}

const SiteMap = () => {
  const groupedMenu = useMemo(
    () => new SiteMapConstructor().getGroups(sortedSiteMapPages),
    []
  )

  const draw = (results: Result[]) => {
    return (
      <ul className="pl-4">
        {results.map((result, index) => (
          <Fragment key={`${index}-${result.pageInfo.path}`}>
            <li className="pb-2">
              <Link href={result.pageInfo.path}>{result.pageInfo.display}</Link>
            </li>
            {result.children.length > 0 && (
              <li className="pb-4">{draw(result.children)}</li>
            )}
          </Fragment>
        ))}
      </ul>
    )
  }

  return (
    <>
      <div className="walcron-container">
        <h1>SiteMap</h1>
        {draw(groupedMenu)}
      </div>
      <ScrollToTop />
    </>
  )
}

export default memo(SiteMap)
