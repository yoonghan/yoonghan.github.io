import * as React from "react"
import { withRouter, NextRouter } from "next/router"
import { WithRouterProps } from "next/dist/client/with-router"
import styles from "./NavMenu.module.css"

export interface Props extends WithRouterProps {}

const writeLink = (router: NextRouter) => {
  const pathname = router.pathname
  const paths = pathname.split("/")
  let accumulatedPath = ""
  const splittedLinks = paths.map((path, index) => {
    if (path === "") {
      return index === 0 ? (
        <a href={"/"} key={`_linkroot`} className={"navmenu-link"}>
          home
        </a>
      ) : null
    } else if (path !== "") {
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
    }
  })
  return splittedLinks
}
const NavMenu = ({ router }: Props) => {
  return (
    <nav className={styles.container}>
      <div>Site Map: &nbsp;</div>
      <span className="link">{writeLink(router)}</span>
    </nav>
  )
}

export default withRouter(NavMenu)
