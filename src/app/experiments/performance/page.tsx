/* istanbul ignore file */
"use client"

import dynamic from "next/dynamic"
import styles from "@/pageComponents/Experiments/Performance/Performance.module.css"
import Button from "@/components/Button"
import { useCallback, useState } from "react"

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

const LargeFormNoSSR = dynamic(
  () => import("@/pageComponents/Experiments/Performance/LargeForm"),
  {
    ssr: false,
    loading: () => (
      <div style={{ fontFamily: "Inconsolata", color: "green" }}>
        Loading Large Form
      </div>
    ),
  }
)

const LargeForm2NoSSR = dynamic(
  () => import("@/pageComponents/Experiments/Performance/LargeForm2"),
  {
    ssr: false,
    loading: () => (
      <div style={{ fontFamily: "Inconsolata", color: "green" }}>
        Loading Large Form 2
      </div>
    ),
  }
)

const ReactTrackedNoSSR = dynamic(
  () => import("@/app/experiments/performance/ReactTracked"),
  {
    ssr: false,
    loading: () => (
      <div style={{ fontFamily: "Inconsolata", color: "green" }}>
        Loading React Tracked
      </div>
    ),
  }
)

const Performance = () => {
  const [shown, setShown] = useState<{ [string: string]: boolean }>({
    heavyLoader: false,
    suspend: false,
    largeForm: false,
    largeForm2: false,
    reactTracked: false,
  })

  const toggleShow = useCallback((id: string) => {
    setShown((shownId) => ({
      ...shownId,
      [id]: !shownId[id],
    }))
  }, [])

  const renderShownComponent = (
    id: string,
    buttonText: string,
    component: any
  ) => {
    return (
      <>
        <Button
          onClick={() => {
            toggleShow(id)
          }}
          styling={{ small: true, inverted: false }}
        >
          {buttonText}
        </Button>
        {shown[id] && component}
      </>
    )
  }

  return (
    <>
      <div className={styles.container}>
        <section>
          <h3>
            Using Dynamics of NextJS, the performance logs are visible in
            console and only in DEV
          </h3>
          {renderShownComponent(
            "heavyLoader",
            "Toggle Display",
            <HeavyLoaderNoSSR />
          )}
        </section>
      </div>

      <div className={styles.container}>
        <section>
          <h3>Using React 18 Suspense</h3>
          {renderShownComponent(
            "suspense",
            "Toggle Suspense Display",
            <SuspenseNoSSR />
          )}
        </section>
      </div>

      <div className={styles.container}>
        <section>
          <h3>Testing React Tracked</h3>

          {renderShownComponent(
            "reactTracked",
            "Toggle React Tracked",
            <ReactTrackedNoSSR />
          )}
        </section>
      </div>

      <div className={styles.container}>
        <section>
          <h3>Large Form Handling</h3>

          {renderShownComponent(
            "largeForm",
            "Toggle Large Form",
            <LargeFormNoSSR />
          )}
        </section>
      </div>

      <div className={styles.container}>
        <section>
          <h3>Large Form Handling with React-Tracked</h3>

          {renderShownComponent(
            "largeForm2",
            "Toggle Large Form 2",
            <LargeForm2NoSSR />
          )}
        </section>
      </div>
    </>
  )
}

export const config = { runtime: "nodejs" }

export default Performance
