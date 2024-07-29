import Button from "@/components/Button"
import styles from "./notfound.module.css"

export default function NotFound() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.innerContainer}>
          <div>
            <h1>404</h1>This page is not found
          </div>
          <Button href="https://www.walcron.com">Go back to home</Button>
        </div>
      </div>
    </>
  )
}
