import HtmlHead from "@/components/HtmlHead"
import Head from "next/head"
import Menu from "@/components/Menu"
import dynamic from "next/dynamic"
import Footer from "@/components/Footer"
import ScrollToTop from "@/components/ScrollToTop"
import styles from "@/pageComponents/Experiments/Performance/Performance.module.css"
import Button from "@/components/Button"
import { useState } from "react"

const HeavyLoaderNoSSR = dynamic(
  () => import("@/pageComponents/Experiments/Performance/HeavyLoader"),
  {
    ssr: false,
    loading: () => (
      <div style={{ fontFamily: "Inconsolata", color: "green" }}>
        Loading Experimental Performance
      </div>
    ),
  }
)

const SuspenseNoSSR = dynamic(
  () => import("@/pageComponents/Experiments/Performance/SuspenseLoader"),
  {
    ssr: false,
    loading: () => (
      <div style={{ fontFamily: "Inconsolata", color: "green" }}>
        Loading Experimental Suspense
      </div>
    ),
  }
)

const Performance = () => {
  const [showHeavyLoader, setShowHeavyLoader] = useState(false)
  const [showSuspense, setShowSuspense] = useState(false)

  return (
    <>
      <HtmlHead
        title={"Performance"}
        description={"Page to test performance of renders."}
      />
      <Head>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <Menu />
      <div className={styles.container}>
        <section>
          <h3>
            Using Dynamics of NextJS, the performance logs are visible in
            console and only in DEV
          </h3>
          <Button
            onClick={() => {
              setShowHeavyLoader(!showHeavyLoader)
            }}
            styling={{ small: true, inverted: false }}
          >
            Toggle Display
          </Button>
          {showHeavyLoader && <HeavyLoaderNoSSR />}
        </section>
      </div>
      <div className={styles.container}>
        <section>
          <h3>Using React 18 Suspense</h3>
          <Button
            onClick={() => {
              setShowSuspense(!showSuspense)
            }}
            styling={{ small: true, inverted: false }}
          >
            Toggle Display
          </Button>
          {showSuspense && <SuspenseNoSSR />}
        </section>
      </div>
      <Footer />
      <ScrollToTop />
    </>
  )
}

export const config = { runtime: "nodejs" }

export default Performance
