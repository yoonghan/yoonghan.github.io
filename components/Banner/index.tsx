import * as React from "react"
import LogoText from "../LogoText"
import styles from "./Banner.module.css"

const Banner = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className={styles.banner}>
      <h1>
        <LogoText /> will be back online
      </h1>
      <h2>Currently we are under-construction</h2>
      <section>
        <span>What we are at:</span>
        <ul>
          <li>Bringing latest Next.JS codes</li>
          <li>100% code coverage website</li>
          <li>Hello typescript</li>
          <li>Bye-bye Internet Explorer</li>
          <li>Bye-bye Modernizer</li>
        </ul>
      </section>
      {children && <section>{children}</section>}
    </div>
  )
}

export default Banner
