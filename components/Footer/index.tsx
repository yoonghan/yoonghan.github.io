import { useMemo, memo, useCallback } from "react"
import styles from "./Footer.module.css"
import Link from "next/link"
import { sortedFooterPages, PageConfig } from "../../config/pages"

interface Props {
  className?: string
}

const Footer = ({ className }: Props) => {
  const renameDisplays = (display: string) => {
    switch (display) {
      case "Projects":
        return "All"
      default:
        return display
    }
  }

  const renderLinks = useCallback(
    (footerPage: PageConfig) => (
      <li key={footerPage.display}>
        <Link href={footerPage.path}>{renameDisplays(footerPage.display)}</Link>
      </li>
    ),
    []
  )

  const renderedLearn = useMemo(() => {
    return sortedFooterPages
      .filter((footerPage) => !footerPage.path.startsWith("/projects"))
      .map((footerPage) => renderLinks(footerPage))
  }, [renderLinks])

  const renderedProjects = useMemo(() => {
    return sortedFooterPages
      .filter((footerPage) => footerPage.path.startsWith("/projects"))
      .map((footerPage) => renderLinks(footerPage))
  }, [renderLinks])

  return (
    <footer className={`${styles.container} ${className || ""}`}>
      <div className="border-b"></div>
      <div className={styles.flex}>
        <ul aria-label="Learn">
          <li>
            <strong>Learn</strong>
          </li>
          {renderedLearn}
        </ul>
        <ul aria-label="Projects">
          <li>
            <strong>Projects</strong>
          </li>
          {renderedProjects}
        </ul>
      </div>
      <div className="border-b"></div>
      <small>Walcron 2014-2022 &copy;</small>
      <ul className={styles.sidelink}>
        <li>
          <Link
            href="https://policies.google.com/technologies/cookies"
            target="_blank"
          >
            Privacy
          </Link>
        </li>
        <li>
          <Link href="/sitemap">Site Map</Link>
        </li>
      </ul>
    </footer>
  )
}

export default memo(Footer)
