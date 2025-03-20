"use client"

import { useEffect } from "react"
import { useDisableAnimation } from "../../utils/hooks/disableAnimation/useDisableAnimation"
import { useTrackReducer } from "@/components/utils/hooks/tracker/useTrackReducer"
import useScrollTracker from "@/components/utils/hooks/tracker/useScrollTracker"
import styles from "./FunkyScroller.module.css"

function FunkyScroller({
  title,
  className,
}: {
  title: string
  className?: string
}) {
  const { scrollToTop } = useScrollTracker()

  const { isAnimatable } = useDisableAnimation()

  const { append, data } = useTrackReducer({
    initialData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    maxStorage: 10,
    allowStorageAfterMiliseconds: 50,
  })

  useEffect(() => {
    if (isAnimatable) {
      append(scrollToTop.y)
    }
  }, [append, isAnimatable, scrollToTop.y])

  const calculatePos = (pos: number, currentData: number[]) => {
    const total = currentData.reduce((sum, i) => sum + i, 0)
    return `${total === 0 ? 0 : (pos / total) * 180}px`
  }

  return (
    <div
      className={`${className || ""} ${isAnimatable ? "" : "animate-none"}`}
      title={title}
    >
      {data.map((pos, i) => (
        <div
          key={i}
          className={styles.circle}
          style={{ width: calculatePos(pos, [...data]) }}
        ></div>
      ))}
    </div>
  )
}

export default FunkyScroller
