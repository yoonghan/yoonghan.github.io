import Button from "@/components/Button"
import styles from "./notfound.module.css"
import { site } from "@/config/site"

export default function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <div>
          <h1>404</h1>This page is not found
        </div>
        <Button href={site.url}>Go back to home</Button>
      </div>
    </div>
  )
}
