import React from "react"
import styles from "./Orb.module.css"

const Orb = () => {
  return (
    <div className={styles.siriOrb} data-testid="siri-orb">
      <div className={`${styles.wave} ${styles.wave1}`}></div>
      <div className={`${styles.wave} ${styles.wave2}`}></div>
      <div className={`${styles.wave} ${styles.wave3}`}></div>
      <div className={`${styles.wave} ${styles.wave4}`}></div>
    </div>
  )
}

export default Orb
