import Footer from "@/components/Footer"
import HtmlHead from "@/components/HtmlHead"
import { Fragment, memo, useMemo } from "react"
import ScrollToTop from "@/components/ScrollToTop"
import Link from "next/link"
import HeaderOne from "@/components/HeaderOne"
import styles from "@/pageComponents/Sitemap/Sitemap.module.css"
import {
  Result,
  SiteMapConstructor,
} from "@/pageComponents/Sitemap/sitemapConstructor"
import { sortedSiteMapPages } from "@/config/pages"
import Menu from "@/components/Menu"

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
      <HtmlHead title={"Site Map"} description={"Website links and site."} />
      <div>
        <Menu />
      </div>
      <div className={`${styles.container} page-aligned-container`}>
        <HeaderOne title={"Sitemap"} isLined={false} />
        {draw(groupedMenu)}
      </div>
      <Footer />
      <ScrollToTop />
    </>
  )
}

export default memo(SiteMap)
