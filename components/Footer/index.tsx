import { useMemo, memo, useCallback } from "react"
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
    <footer className={`container ${className || ""}`}>
      <div className="border-b"></div>
      <div className={"flex"}>
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
      <small>Walcron 2014-2022 &copy;</small>
      <ul className={"sidelink"}>
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
      <style jsx>{`
        .container {
          margin: 0 auto;
          position: relative;
          padding: 8rem 0.5rem 0.5rem 0.5rem;
          max-width: 1024px;
        }

        .container .flex {
          display: flex;
        }

        .container :global(a) {
          color: inherit;
          font-size: 0.75rem;
        }

        .container :global(ul) {
          list-style: none;
        }

        .container :global(li) {
          margin: 0.5rem 0;
        }

        .container ul.sidelink {
          margin: 0;
          display: inline-flex;
        }

        .container ul.sidelink > :global(li) {
          padding: 0 1rem;
          border-right: 1px solid;
        }

        .container ul.sidelink > :global(li:last-child) {
          border-right: 0;
        }

        @media only screen and (max-width: 480px) {
          .container {
            text-align: center;
            padding-bottom: 0.5rem;
          }

          .container ul.sidelink {
            display: flex;
            margin: 0;
            padding: 0;
            justify-content: center;
          }
        }
      `}</style>
    </footer>
  )
}

export default memo(Footer)
