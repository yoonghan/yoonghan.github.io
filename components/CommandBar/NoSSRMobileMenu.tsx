import * as React from "react"
import { withRouter } from "next/router"
import ButtonsBar from "../ButtonsBar"
import { ILink } from "../ButtonsBar"
import { WithRouterProps } from "next/dist/client/with-router"

const AVAILABLE_MENUS: Array<ILink> = [
  {
    title: "Home",
    link: "/",
  },
  {
    title: "About",
    link: "/about",
  },
  {
    title: "Showcase",
    link: "/creation",
  },
]

interface NoSSRMobileMenuProps extends WithRouterProps {}

const NoSSRMobileMenu = (props: NoSSRMobileMenuProps) => {
  const getIndex = (): number => {
    const pathName = props.router.pathname
    return AVAILABLE_MENUS.findIndex((menu) => menu.link === pathName)
  }

  return (
    <React.Fragment>
      <ButtonsBar menuTexts={AVAILABLE_MENUS} activeIndex={getIndex()} />
    </React.Fragment>
  )
}

export default withRouter(NoSSRMobileMenu)
