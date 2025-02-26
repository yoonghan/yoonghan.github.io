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
  const { append, data } = useTrackReducer({
    initialData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    maxStorage: 10,
    allowStorageAfterMiliseconds: 50,
  })
  const { scrollToTop } = useScrollTracker()

  const { isAnimatable } = useDisableAnimation()

  useEffect(() => {
    if (isAnimatable) append(scrollToTop.y)
  }, [append, isAnimatable, scrollToTop.y])

  const total = data.reduce((sum, i) => sum + i, 0)

  const calculatePos = (pos: number) =>
    `${total === 0 ? 0 : (pos / total) * 500}px`

  return (
    <div
      className={`${className || ""} ${isAnimatable ? "" : "animate-none"}`}
      title={title}
    >
      {data.map((pos, i) => (
        <div
          key={i}
          className={styles.circle}
          style={{ width: calculatePos(pos) }}
        ></div>
      ))}
    </div>
  )
}

export default FunkyScroller
