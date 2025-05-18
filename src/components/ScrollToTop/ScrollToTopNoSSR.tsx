"use client"

import {
  memo,
  useEffect,
  useState,
  useRef,
  useTransition,
  useCallback,
} from "react"
import style from "./ScrollToTop.module.css"

const _isOverTheBar = () => {
  const currentScrollPos = window.scrollY
  return currentScrollPos > 500
}

const ScrollToTopNoSSR = () => {
  const [visible, setVisible] = useState(_isOverTheBar())
  const [_, startTransition] = useTransition()

  const updateScroller = useCallback(
    () =>
      startTransition(() => {
        setVisible(_isOverTheBar())
      }),
    []
  )

  useEffect(() => {
    window.addEventListener("scroll", updateScroller)
    return () => {
      window.removeEventListener("scroll", updateScroller)
    }
  }, [updateScroller])

  const clickScrollUp = () => {
    window.scrollTo(0, 0)
  }

  const visibilityStyle = visible ? "" : ` ${style.hidden}` 

  return (
    <button
      data-testid="scroll-to-top"
      onClick={clickScrollUp}
      onKeyUp={clickScrollUp}
      className={style.scroller + visibilityStyle}
    >
      TOP
    </button>
  )
}

export default memo(ScrollToTopNoSSR, () => true)
