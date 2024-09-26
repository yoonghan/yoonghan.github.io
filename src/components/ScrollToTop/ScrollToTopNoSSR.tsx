"use client"

import {
  memo,
  useEffect,
  useState,
  useRef,
  useTransition,
  useCallback,
  useDeferredValue,
} from "react"
import style from "./ScrollToTop.module.css"

const _isOverTheBar = () => {
  const currentScrollPos = window.scrollY
  return currentScrollPos > 500
}

const ScrollToTopNoSSR = () => {
  const [visible, setVisible] = useState(_isOverTheBar())
  const isVisible = useDeferredValue(visible)

  const updateScroller = useCallback(() => {
    setVisible(_isOverTheBar())
  }, [])

  useEffect(() => {
    window.addEventListener("scroll", updateScroller)
    return () => {
      window.removeEventListener("scroll", updateScroller)
    }
  }, [updateScroller])

  const clickScrollUp = () => {
    window.scrollTo(0, 0)
  }

  return (
    <button
      data-testid="scroll-to-top"
      onClick={clickScrollUp}
      onKeyUp={clickScrollUp}
      className={style.scroller + `${isVisible ? "" : ` ${style.hidden}`}`}
    >
      TOP
    </button>
  )
}

export default memo(ScrollToTopNoSSR, () => true)
