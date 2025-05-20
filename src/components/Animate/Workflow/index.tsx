"use client"

import { ReactNode } from "react"
import { useDisableAnimation } from "../../utils/hooks/disableAnimation/useDisableAnimation"
import styles from "./Workflow.module.css"

function Workflow({
  children,
  title,
  className = "",
}: Readonly<{
  children: ReactNode
  title: string
  className?: string
}>) {
  const { isAnimatable } = useDisableAnimation()
  return (
    <div className={`${className} relative`} title={title}>
      {children}
      <div
        className={`${styles.container} ${isAnimatable ? "" : "animate-none"}`}
        data-testid="workflow"
      >
        <div className={styles.box}></div>
        <div className={styles.line}></div>
        <div className={styles.box}></div>
        <div className={styles.line}></div>
        <div className={styles.box}></div>
      </div>
    </div>
  )
}

export default Workflow
