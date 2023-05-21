import { Fragment, memo, useMemo } from "react"
import ScrollToTop from "@/components/ScrollToTop"
import Link from "next/link"
import HeaderOne from "@/components/HeaderOne"
import styles from "./Sitemap.module.css"
import { Result, SiteMapConstructor } from "./sitemapConstructor"
import { sortedSiteMapPages } from "@/config/pages"

const SiteMap = ({}) => {
  const groupedMenu = useMemo(
    () => new SiteMapConstructor().getGroups(sortedSiteMapPages),
    []
  )

  const draw = (results: Result[]) => {
    return (
      <ul className={"u-list"}>
        {results.map((result, index) => (
          <Fragment key={index}>
            <li>
              <Link href={result.pageInfo.path}>
                {result.pageInfo.display.toLocaleUpperCase()}
              </Link>
            </li>
            {result.children.length > 0 && <li>{draw(result.children)}</li>}
          </Fragment>
        ))}
      </ul>
    )
  }

  return (
    <>
      <div className={`${styles.container} page-aligned-container`}>
        <HeaderOne title={"Sitemap"} isLined={false} />
        {draw(groupedMenu)}
      </div>
      <ScrollToTop />
    </>
  )
}

export default memo(SiteMap)
