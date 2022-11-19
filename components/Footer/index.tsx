import * as React from "react"
import styles from "./Footer.module.css"
import Link from "next/link"

interface Props {
  className?: string
}

const Footer = ({ className }: Props) => {
  return (
    <footer className={`${styles.container} ${className}`}>
      <div className="border-b"></div>
      <div className={styles.flex}>
        <ul>
          <li>
            <strong>Learn</strong>
          </li>
          <li>
            <Link href="/about">About Us</Link>
          </li>
          <li>
            <Link href="/history">History</Link>
          </li>
        </ul>
        <ul>
          <li>
            <strong>Projects</strong>
          </li>
          <li>
            <Link href="/projects">All</Link>
          </li>
          <li>
            <Link href="/projects/lessons">Lesson</Link>
          </li>
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

export default Footer
