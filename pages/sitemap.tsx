import CommandBar from "@/components/CommandBar"
import Footer from "@/components/Footer"
import HtmlHead from "@/components/HtmlHead"
import { memo } from "react"
import ScrollToTop from "@/components/ScrollToTop"
import Link from "next/link"
import HeaderOne from "@/components/HeaderOne"
import styles from "@/pageComponents/Sitemap/Sitemap.module.css"

const SiteMap = ({}) => {
  return (
    <>
      <HtmlHead title={"Site Map"} description={"Website links and site."} />
      <div>
        <CommandBar />
      </div>
      <div className={`${styles.container} page-aligned-container`}>
        <HeaderOne title={"Sitemap"} isLined={false} />
        <ul className={"u-list"}>
          <li>
            <Link href="/">HOME</Link>
          </li>
          <li>
            <span>SECTION</span>
            <ul className={"u-list"}>
              <li>
                <Link href="/about">ABOUT US</Link>
              </li>
              <li>
                <Link href="/history">HISTORY</Link>
              </li>
              <li>
                <Link href="/projects">PROJECTS</Link>
                <ul className={"u-list"}>
                  <li>
                    <Link href="/projects/lessons">Lessons Learned</Link>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <Footer />
      <ScrollToTop />
    </>
  )
}

export default memo(SiteMap)
