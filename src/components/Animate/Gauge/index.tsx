"use client"

import { ReactNode } from "react"
import { useDisableAnimation } from "../../utils/hooks/disableAnimation/useDisableAnimation"
import styles from "./Gauge.module.css"

function Gauge({
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
    <div className={`${className || ""}`} title={title}>
      <div className={styles.container}>
        <div
          className={`${styles.percent} ${isAnimatable ? "" : "animate-none"}`}
          data-testid={"gauge"}
        ></div>
        <div className={`${styles.mask}`}></div>
      </div>
      {children}
    </div>
  )
}

export default Gauge
