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
    <div className={`${className || ""} relative`} title={title}>
      <div
        className={`${styles.wave} ${styles.front} ${
          !isAnimatable ? "animate-none" : ""
        }`}
      ></div>
      <div
        className={`${styles.wave} ${styles.back} ${
          !isAnimatable ? "animate-none" : ""
        }`}
      ></div>
      {children}
    </div>
  )
}

export default Wave
