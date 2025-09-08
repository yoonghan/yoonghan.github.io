"use client"

import React from "react"
import styles from "./Orb.module.css"
import { useDisableAnimation } from "@/components/utils/hooks/disableAnimation/useDisableAnimation"

const Orb = () => {
  const { isAnimatable } = useDisableAnimation()
  return (
    <div
      className={`${styles.siriOrb} ${isAnimatable ? "" : styles.noAnimation}`}
      data-testid="siri-orb"
    >
      <div className={`${styles.wave} ${styles.wave1}`}></div>
      <div className={`${styles.wave} ${styles.wave2}`}></div>
      <div className={`${styles.wave} ${styles.wave3}`}></div>
      <div className={`${styles.wave} ${styles.wave4}`}></div>
    </div>
  )
}

export default Orb
