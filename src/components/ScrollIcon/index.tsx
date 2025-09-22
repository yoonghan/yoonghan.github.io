import * as React from "react"
import { useSpring, animated } from "@react-spring/web"
import styles from "./ScrollIcon.module.css"

interface Props {
  scrollContainer: React.RefObject<HTMLDivElement | null>
  text?: string
}

const ScrollIcon = ({ scrollContainer, text }: Props) => {
  const [opacity, setOpacity] = useSpring(() => ({ opacity: 1 }))

  const _controlIconDisplay = React.useCallback(() => {
    setOpacity.start({ opacity: 0 })
  }, [setOpacity])

  React.useEffect(() => {
    if (scrollContainer.current !== null) {
      const scrollRef = scrollContainer.current
      scrollRef.addEventListener("scroll", _controlIconDisplay, {
        passive: true,
      })

      return () => {
        queueMicrotask(() => {
          scrollRef.removeEventListener("scroll", _controlIconDisplay)
        })
      }
    }
  }, [_controlIconDisplay, scrollContainer])

  return (
    <animated.div style={opacity} className={styles.container}>
      <div
        className={`${styles.scroll} ${styles.icon}`}
        data-testid={"scroll-icon"}
      ></div>
      {text && <div className={`${styles.scroll} ${styles.text}`}>{text}</div>}
    </animated.div>
  )
}

export default ScrollIcon
