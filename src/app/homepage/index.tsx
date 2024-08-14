import styles from "./Homepage.module.css"
import SocialFab from "@/components/SocialFab"
import ClientCookie from "@/components/ClientCookie"

function Homepage() {
  return (
    <>
      <main className={styles.homepage}></main>
      <SocialFab />
      <ClientCookie />
    </>
  )
}

export default Homepage
