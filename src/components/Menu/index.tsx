/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */
import { sortedMenuPagesWithFilteredHomeAndSubMenu } from "@/config/pages"
import { animated, useChain, useSpring, useSpringRef } from "@react-spring/web"
import { WithRouterProps } from "next/dist/client/with-router"
import Link from "next/link"
import { withRouter } from "next/router"
import React, { useCallback, useState } from "react"
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
  const [_display, setDisplay] = useState(Display.Menu)

  const menuRef = useSpringRef()
  const [springMenu, apiMenu] = useSpring(() => ({
    ref: menuRef,
    from: { scale: 1, width: "100%" },
  }))
  const commandRef = useSpringRef()
  const [springCommand, apiCommand] = useSpring(() => ({
    ref: commandRef,
    from: { scale: 0, width: "0", height: "0" },
  }))
  useChain([menuRef, commandRef])
  const [springButton, apiButton] = useSpring(() => ({
    from: { transform: "rotate(0deg)" },
  }))
  useChain([menuRef, commandRef])

  const isNotLastRecord = (index: number) => {
    return index !== sortedMenuPagesWithFilteredHomeAndSubMenu?.length - 1
  }

  const isCurrentPath = (menuPath: string) => pathname == menuPath

  const onSwitchClick = useCallback(() => {
    setDisplay((currentDisplay) => {
      if (currentDisplay === Display.Menu) {
        apiButton.start({
          to: { transform: "rotate(180deg)" },
        })
        apiMenu.start({
          to: { scale: 0, width: "0" },
        })
        apiCommand.start({
          to: { scale: 1, width: "100%", height: "5rem" },
        })
        return Display.Command
      } else {
        apiMenu.start({
          to: { scale: 1, width: "100%" },
        })
        apiCommand.start({
          to: { scale: 0, width: "0%", height: "0" },
        })
        apiButton.start({
          to: { transform: "rotate(0deg)" },
        })
        return Display.Menu
      }
    })
  }, [apiButton, apiCommand, apiMenu])

  return (
    <div className={style.container}>
      <animated.div className={style.menu} style={{ ...springMenu }}>
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
      </animated.div>
      <animated.div className={style.command} style={{ ...springCommand }}>
        <CommandBar />
      </animated.div>
      <animated.button
        onClick={onSwitchClick}
        className={style.switchButton}
        style={{ ...springButton }}
      >
        〈
      </animated.button>
    </div>
  )
}

export default withRouter(Menu)
