import * as React from "react"
import Link from "next/link"
import styles from "./ButtonsBar.module.css"

export interface ILink {
  title: string
  link: string
}

export interface ButtonsBarProps {
  menuTexts: Array<ILink>
  activeIndex?: number
}

const ButtonsBar = ({ menuTexts, activeIndex }: ButtonsBarProps) => {
  function _generateMenu(iLink: ILink, idx: number) {
    const link = iLink.link
    const title = iLink.title
    const _activeIdx = activeIndex || 0
    const className =
      styles["btnsbar-item"] +
      " " +
      (_activeIdx === idx ? styles["is-active"] : "")
    return (
      <li className={`${className}`} key={`btns-bar_${idx}`}>
        <Link href={link}>{title}</Link>
      </li>
    )
  }

  return (
    <menu className={`${styles.btnsbar} ${styles["with-indicator"]}`}>
      {menuTexts.map(_generateMenu)}
    </menu>
  )
}

export default ButtonsBar
