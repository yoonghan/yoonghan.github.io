import { useMemo, memo, useCallback } from "react"
import Link from "next/link"
import { sortedFooterPages, PageConfig } from "../../config/pages"

const Footer = () => {
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
    <footer className="pt-16">
      <hr className="w-full"></hr>
      <div className="text-center flex-col flex justify-center gap-5 py-4 md:flex-row md:gap-14">
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
      <hr className="w-full"></hr>
      <div className="flex justify-between  p-4">
        <strong>Walcron 2014-2024 &copy;</strong>
        <ul className="flex gap-4">
          <li>
            <Link
              href="https://policies.google.com/technologies/cookies"
              target="_blank"
            >
              Privacy
            </Link>
          </li>
          <li>|</li>
          <li>
            <Link href="/sitemap">Site Map</Link>
          </li>
        </ul>
      </div>
    </footer>
  )
}

export default memo(Footer)
