import * as React from "react"
import styles from "./NavMenu.module.css"
import { usePathname } from "next/navigation"

const writeLink = (pathname: string | null) => {
  const paths = (pathname ?? "/").split("/")
  let accumulatedPath = ""
  const splittedLinks = paths.map((path, index) => {
    if (path === "") {
      return index === 0 ? (
        <a href={"/"} key={`_linkroot`} className={"navmenu-link"}>
          home
        </a>
      ) : null
    }
    accumulatedPath += "/" + path
    return (
      <a
        href={accumulatedPath}
        key={`_link${path}`}
        className={styles.navmenuLink}
      >
        {" "}
        &gt; {path}
      </a>
    )
  })
  return splittedLinks
}
const NavMenu = () => {
  const pathName = usePathname()
  return (
    <nav className={styles.container} aria-label="Site Map">
      <div>Site Map: &nbsp;</div>
      <span className="link">{writeLink(pathName)}</span>
    </nav>
  )
}

export default NavMenu
