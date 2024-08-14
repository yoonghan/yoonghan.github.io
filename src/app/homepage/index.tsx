import styles from "./Homepage.module.css"
import SocialFab from "@/components/SocialFab"
import ClientCookie from "@/components/ClientCookie"

function Homepage() {
  return (
    <>
      <main className={`${styles.container} container mx-auto`}>
        <article>
          <h1 className="text-4xl text-center pb-12">
            Welcome to Walcron website
          </h1>
          <p>
            This is a sandbox website for us to <strong>explore</strong>{" "}
            real-time Web Development.
          </p>

          <p>
            We&apos;re just a regular coder who are keen in{" "}
            <strong>Web and Cloud</strong> technologies.
          </p>

          <p>
            This site to <strong>records</strong> our development and things we
            learn.
          </p>
        </article>
        <article></article>
      </main>
      <SocialFab />
      <ClientCookie />
    </>
  )
}

export default Homepage
