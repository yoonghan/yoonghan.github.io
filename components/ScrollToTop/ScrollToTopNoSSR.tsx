import * as React from "react"
import styles from "./ScrollToTop.module.css"

export interface ScrollToTopStates {
  visible: boolean
}

const _isOverTheBar = () => {
  const currentScrollPos = window.pageYOffset
  return currentScrollPos > 320
}

const ScrollToTopNoSSR = () => {
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

  return (
    <React.Fragment>
      {visible && (
        <div
          onClick={clickScrollUp}
          className={styles.scroller}
          aria-hidden={true}
        >
          Up
        </div>
      )}
    </React.Fragment>
  )
}

export default ScrollToTopNoSSR
