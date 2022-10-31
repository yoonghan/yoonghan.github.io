import { Children, useCallback, useEffect, useRef, useState } from "react"
import styles from "./Parallax.module.css"
import {
  activeWindowIndex,
  calculatePercentageChange,
  updateElem,
} from "./parallaxChange"

interface Props {
  scrollContainer: React.RefObject<HTMLDivElement>
  children: React.ReactNode
}

const Parallax = ({ scrollContainer, children }: Props) => {
  const arrayChildren = Children.toArray(children)
  const windowInnerHeight = useRef(0)
  const parallaxDisplayContainerRef = useRef<HTMLDivElement>(null)

  const parallaxSectionsRef = useRef<HTMLDivElement[]>()
  const parallaxContainerRef = useRef<HTMLDivElement>(null)

  const parallaxScrollForeground = useCallback((e: any) => {
    const currentPos = e.target.scrollTop
    const currentDisplayIdx = activeWindowIndex(
      currentPos,
      windowInnerHeight.current
    )

    const percentageChanged = calculatePercentageChange(
      currentPos - windowInnerHeight.current * currentDisplayIdx,
      windowInnerHeight.current
    )

    updateElem(
      parallaxSectionsRef.current,
      currentDisplayIdx,
      percentageChanged
    )
  }, [])

  const refreshContainer = useCallback(() => {
    windowInnerHeight.current = window.innerHeight
  }, [])

  useEffect(() => {
    parallaxSectionsRef.current = Array.from(
      document.getElementsByClassName(
        styles["section-container"]
      ) as HTMLCollectionOf<HTMLDivElement>
    )
  }, [])

  useEffect(() => {
    const scrollContainerRef = scrollContainer.current

    scrollContainerRef?.addEventListener("scroll", parallaxScrollForeground)

    refreshContainer()

    window.addEventListener("resize", refreshContainer)
    return () => {
      window.removeEventListener("resize", refreshContainer)
      scrollContainerRef?.removeEventListener(
        "scroll",
        parallaxScrollForeground
      )
    }
  }, [parallaxScrollForeground, refreshContainer, scrollContainer])

  return (
    <div
      className={styles["container"]}
      style={{ height: `${arrayChildren.length}00vh` }}
      ref={parallaxDisplayContainerRef}
      data-testid={"parallax-container"}
    >
      <div
        className={styles["parallax-container"]}
        ref={parallaxContainerRef}
        style={{ background: "#0000FF" }}
      >
        {Children.map(arrayChildren, (child, index) => (
          <div className={styles["section-container"]} key={index}>
            {child}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Parallax
