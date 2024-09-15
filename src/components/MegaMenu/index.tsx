"use client"

import { Menu } from "@yoonghan/walcron-microfrontend-shared"
import "@yoonghan/walcron-microfrontend-shared/dist/style.css"
import menuItems from "./config/menuItems"
import Link from "@/components/Link"
import Image from "next/image"
import { memo } from "react"
import styles from "./MegaMenu.module.css"
import SearchBar from "./SearchBar"

const MegaMenu = () => {
  const MenuLink = (text: string, href: string, onClick?: () => void) => (
    <Link href={href} onClick={onClick}>
      <div>{text}</div>
    </Link>
  )

  const HomeLink = (href: string, onClick: () => void) => (
    <Link href={href} onClick={onClick}>
      <Image
        src="/img/logo/logo-color.svg"
        alt="walcron logo"
        width={36}
        height={36}
      />
    </Link>
  )

  const HomeLogoLink = (helperClassName: string) => (
    <Link href={"/"} className={helperClassName}>
      <Image
        src="/img/logo/logo-color.svg"
        alt="home"
        width={18}
        height={18}
        className="mr-4"
      />
    </Link>
  )

  return (
    <Menu
      model={menuItems}
      menuLink={MenuLink}
      homeLink={HomeLink}
      homeLogoLink={HomeLogoLink}
      shortcutComponent={<SearchBar />}
      desktopClassName={styles.desktop_container}
      mobileClassName={styles.mobile_container}
    />
  )
}

export default memo(MegaMenu)
