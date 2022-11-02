import * as React from "react"
import styles from "./Footer.module.css"

interface Props {
  isRelative?: boolean
  className?: string
}

const Footer = ({ isRelative, className }: Props) => {
  return (
    <footer
      className={`${styles.container} ${
        isRelative ? styles.relative : styles.absolute
      } ${className}`}
    >
      Walcron 2014-2022 &copy;
    </footer>
  )
}

export default Footer
