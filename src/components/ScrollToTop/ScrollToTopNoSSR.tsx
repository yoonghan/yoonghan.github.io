import * as React from "react"
import styles from "./ScrollToTop.module.css"

export interface ScrollToTopStates {
  visible: boolean
}

const _isOverTheBar = () => {
  const currentScrollPos = window.pageYOffset
  return currentScrollPos > 320
}

const ScrollToTopNoSSR = ({ isLight = false }: { isLight?: boolean }) => {
  const [visible, setVisible] = React.useState(_isOverTheBar())

  const _handleScroll = () => {
    setVisible(_isOverTheBar())
  }

  React.useEffect(() => {
    window.addEventListener("scroll", _handleScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", _handleScroll)
    }
  }, [])

  const clickScrollUp = () => {
    window.scrollTo(0, 0)
  }

  if (visible) {
    return (
      <div
        onClick={clickScrollUp}
        className={`${styles.scroller} ${isLight ? styles.light : ""}`}
        aria-hidden={true}
      >
        Up
      </div>
    )
  } else {
    return <div data-testid="scroll-to-top"></div>
  }
}

export default ScrollToTopNoSSR
