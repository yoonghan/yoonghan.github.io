/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */
import { sortedMenuPagesWithFilteredHomeAndSubMenu } from "@/config/pages"
import { WithRouterProps } from "next/dist/client/with-router"
import Image from "next/image"
import Link from "next/link"
import { withRouter } from "next/router"
import React, { useState } from "react"
import CommandBar from "../CommandBar"
import style from "./Menu.module.css"
import SubMenu from "./SubMenu"

export interface Props extends WithRouterProps {}

enum Display {
  Menu,
  Command,
}

const Menu = ({ router }: Props) => {
  const pathname = router.pathname
  const [display, setDisplay] = useState(Display.Menu)

  const isNotLastRecord = (index: number) => {
    return index !== sortedMenuPagesWithFilteredHomeAndSubMenu?.length - 1
  }

  const isCurrentPath = (menuPath: string) => pathname == menuPath

  const onSwitchClick = () => {
    setDisplay(display === Display.Menu ? Display.Command : Display.Menu)
  }

  return (
    <div className={style.container}>
      {display === Display.Menu && (
        <>
          <div className={style.menu}>
            <div className={style.wrapper}>
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
                  {isNotLastRecord(index) && (
                    <span className={style.divider}>|</span>
                  )}
                </React.Fragment>
              ))}
            </div>
            <SubMenu />
          </div>
          <button onClick={onSwitchClick} className={style.switchButton}>
            〈
          </button>
        </>
      )}
      {display === Display.Command && (
        <>
          <button onClick={onSwitchClick} className={style.switchButton}>
            〉
          </button>
          <div className={style.command}>
            <CommandBar />
          </div>
        </>
      )}
    </div>
  )
}

export default withRouter(Menu)
