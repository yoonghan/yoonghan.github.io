"use client"

import { Menu } from "@yoonghan/walcron-microfrontend-shared"
import "@yoonghan/walcron-microfrontend-shared/dist/style.css"
import menuItems from "./config/menuItems"
import Link from "@/components/Link"
import Image from "next/image"
import { memo, useCallback, useState } from "react"
import CommandBar from "../CommandBar"
import { animated, useChain, useSpring, useSpringRef } from "@react-spring/web"
import styles from "./MegaMenu.module.css"

enum Display {
  Menu,
  Command,
}

const MegaMenu = () => {
  const [_display, setDisplay] = useState(Display.Menu)

  const menuRef = useSpringRef()
  const commandRef = useSpringRef()
  const [springCommand, apiCommand] = useSpring(() => ({
    ref: commandRef,
    from: { scale: 0, height: "0" },
  }))

  useChain([menuRef, commandRef])
  const [springButton, apiButton] = useSpring(() => ({
    from: { transform: "rotate(0deg)" },
  }))

  const [springButtonSpan, apiButtonSpan] = useSpring(() => ({
    from: { opacity: 1 },
  }))
  useChain([menuRef, commandRef])

  const onSwitchClick = useCallback(() => {
    setDisplay((currentDisplay) => {
      if (currentDisplay === Display.Menu) {
        apiButton.start({
          to: { transform: "rotate(180deg)" },
        })
        apiButtonSpan.start({
          to: { opacity: 0 },
        })
        apiCommand.start({
          to: { scale: 1, height: "5rem" },
        })
        return Display.Command
      } else {
        apiCommand.start({
          to: { scale: 0, height: "0" },
        })
        apiButton.start({
          to: { transform: "rotate(0deg)" },
        })
        apiButtonSpan.start({
          to: { opacity: 1 },
        })
        return Display.Menu
      }
    })
  }, [apiButton, apiButtonSpan, apiCommand])

  const MenuLink = (
    text: string,
    href: string,
    role: "menuitem",
    onClick?: () => void
  ) => (
    <Link href={href} role={role} onClick={onClick} className="pb-4">
      {text}
    </Link>
  )

  const HomeLink = (
    text: string,
    href: string,
    onClick: () => void,
    tabIndex: number
  ) => (
    <Link href={href} tabIndex={tabIndex} onClick={onClick} className="flex-1">
      {text}
    </Link>
  )

  const HomeLogoLink = (helperClassName: string) => (
    <Link href={"/"} className={helperClassName}>
      <Image src="/img/logo/logo-color.svg" alt="home" width={18} height={18} />
    </Link>
  )

  return (
    <Menu
      model={menuItems}
      mobileHomeText="Walcron"
      menuLink={MenuLink}
      homeLink={HomeLink}
      homeLogoLink={HomeLogoLink}
      shortcutComponent={
        <div className={styles.container}>
          <animated.div style={{ ...springCommand }} data-testid="command-menu">
            <CommandBar commandPromptOnly={true} />
          </animated.div>
          <animated.button
            onClick={onSwitchClick}
            className={styles.switchButton}
            style={{ ...springButton }}
          >
            <animated.span
              style={{ ...springButtonSpan }}
              className={styles.searchText}
            >
              search
            </animated.span>{" "}
            〉
          </animated.button>
        </div>
      }
    />
  )
}

export default memo(MegaMenu)
