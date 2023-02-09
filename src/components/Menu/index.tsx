/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */
import { sortedMenuPagesWithFilteredHomeAndSubMenu } from "@/config/pages"
import { WithRouterProps } from "next/dist/client/with-router"
import Image from "next/image"
import Link from "next/link"
import { withRouter } from "next/router"
import React from "react"
import style from "./Menu.module.css"
import SubMenu from "./SubMenu"

export interface Props extends WithRouterProps {}

const Menu = ({ router }: Props) => {
  const pathname = router.pathname

  const isNotLastRecord = (index: number) => {
    return index !== sortedMenuPagesWithFilteredHomeAndSubMenu?.length - 1
  }

  const isCurrentPath = (menuPath: string) => pathname == menuPath

  return (
    <div className={style.container}>
      <div className={style.menu}>
        <a href="/">
          <img src="/img/logo/logo-color.svg" alt="home" width={18} />
        </a>
        {sortedMenuPagesWithFilteredHomeAndSubMenu.map((menu, index) => (
          <React.Fragment key={menu.path}>
            {isCurrentPath(menu.path) ? (
              <i>{menu.display}</i>
            ) : (
              <Link href={menu.path}>{menu.display}</Link>
            )}
            {isNotLastRecord(index) && <span className={style.divider}>|</span>}
          </React.Fragment>
        ))}
      </div>
      <SubMenu />
    </div>
  )
}

export default withRouter(Menu)
