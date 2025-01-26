"use client"

import { useDisableAnimation } from "../utils/hooks/disableAnimation/useDisableAnimation"
import styles from "./Lifecycle.module.css"

export const animeTailwindClass = "animate-[spin_5s_linear_infinite]"

function AnimatedCircle() {
  const { isAnimatable } = useDisableAnimation()
  return (
    <div
      className={`${styles.circle} ${animeTailwindClass} ${
        isAnimatable ? "" : "animate-none"
      }`}
      title="Deployment Lifecycle"
    ></div>
  )
}

export default AnimatedCircle
