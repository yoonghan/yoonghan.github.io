"use client"
import { ReactNode } from "react"
import { useDisableAnimation } from "../../utils/hooks/disableAnimation/useDisableAnimation"
import styles from "./Waves.module.css"

function Wave({
  children,
  title,
  className = "",
}: Readonly<{
  children: ReactNode
  title: string
  className?: string
}>) {
  const { isAnimatable } = useDisableAnimation()
  const animateClass = !isAnimatable ? " animate-none" : ""

  return (
    <div className={`${className} relative`} title={title}>
      <div className={`${styles.wave} ${styles.front}${animateClass}`}></div>
      <div className={`${styles.wave} ${styles.back}${animateClass}`}></div>
      {children}
    </div>
  )
}

export default Wave
