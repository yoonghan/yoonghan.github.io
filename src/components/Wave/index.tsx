"use client"
import { ReactNode } from "react"
import { useDisableAnimation } from "../utils/hooks/disableAnimation/useDisableAnimation"
import styles from "./Waves.module.css"

function Wave({
  children,
  title,
  className,
}: {
  children: ReactNode
  title: string
  className?: string
}) {
  const { isAnimatable } = useDisableAnimation()

  return (
    <div
      className={`${className || ""} relative ${styles.container} ${
        !isAnimatable && styles.stop
      }`}
      title={title}
    >
      <div className={`${styles.wave} ${styles.front}`}></div>
      <div className={`${styles.wave} ${styles.back}`}></div>
      {children}
    </div>
  )
}

export default Wave
