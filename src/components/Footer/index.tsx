import { useMemo, memo, useCallback } from "react"
import Link from "next/link"
import { sortedFooterPages, PageConfig } from "../../config/pages"
import styles from "./Footer.module.css"

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
      .filter(
        (footerPage) =>
          !footerPage.path.startsWith("/projects") &&
          !footerPage.path.startsWith("/experiments")
      )
      .map((footerPage) => renderLinks(footerPage))
  }, [renderLinks])

  const renderedProjects = useMemo(() => {
    return sortedFooterPages
      .filter((footerPage) => footerPage.path.startsWith("/projects"))
      .map((footerPage) => renderLinks(footerPage))
  }, [renderLinks])

  const renderedExperiments = useMemo(() => {
    return sortedFooterPages
      .filter((footerPage) => footerPage.path.startsWith("/experiments"))
      .map((footerPage) => renderLinks(footerPage))
  }, [renderLinks])

  return (
    <footer className={`${className || ""}`}>
      <div className={styles.container}>
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
          <ul aria-label="Experiments">
            <li>
              <strong>Experiments</strong>
            </li>
            {renderedExperiments}
          </ul>
        </div>
        <div className="border-b"></div>
        <small>Walcron 2014-2024 &copy;</small>
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
      </div>
    </footer>
  )
}

export default memo(Footer)
