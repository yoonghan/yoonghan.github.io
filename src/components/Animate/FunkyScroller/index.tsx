"use client"

import { useEffect } from "react"
import { useDisableAnimation } from "../../utils/hooks/disableAnimation/useDisableAnimation"
import { useTrackReducer } from "@/components/utils/hooks/tracker/useTrackReducer"
import useScrollTracker from "@/components/utils/hooks/tracker/useScrollTracker"

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

  return (
    <div className={`${className || ""} flex`} title={title}>
      <div>
        {data.map((y, i) => (
          <div key={i}>{y}</div>
        ))}
      </div>
    </div>
  )
}

export default FunkyScroller
