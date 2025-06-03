"use client"

import dynamic from "next/dynamic"
import styles from "./Performance.module.css"
import Button from "@/components/Button"
import { useCallback, useState } from "react"

const HeavyLoaderNoSSR = dynamic(() => import("./HeavyLoader"), {
  ssr: false,
  loading: () => (
    <div style={{ fontFamily: "Inconsolata", color: "green" }}>
      Loading Experimental Performance
    </div>
  ),
})

const SuspenseNoSSR = dynamic(() => import("./SuspenseLoader"), {
  ssr: false,
  loading: () => (
    <div style={{ fontFamily: "Inconsolata", color: "green" }}>
      Loading Experimental Suspense
    </div>
  ),
})

const LargeFormNoSSR = dynamic(() => import("./LargeForm"), {
  ssr: false,
  loading: () => (
    <div style={{ fontFamily: "Inconsolata", color: "green" }}>
      Loading Large Form
    </div>
  ),
})

const LargeForm2NoSSR = dynamic(() => import("./LargeForm2"), {
  ssr: false,
  loading: () => (
    <div style={{ fontFamily: "Inconsolata", color: "green" }}>
      Loading Large Form 2
    </div>
  ),
})

const ReactTrackedNoSSR = dynamic(() => import("./ReactTracked"), {
  ssr: false,
  loading: () => (
    <div style={{ fontFamily: "Inconsolata", color: "green" }}>
      Loading React Tracked
    </div>
  ),
})

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
    component: any,
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
    <div className={`${styles.container} walcron-container`}>
      <h1>Test React Performances</h1>
      <p className="pb-8">
        A place dedicated to test React loading performances. Goal is to test
        User Experience and narrow down on writing test cases.
      </p>
      <hr />
      <section>
        <h3>
          Using Dynamics of NextJS, the performance logs are visible in console
          and only in DEV
        </h3>
        {renderShownComponent(
          "heavyLoader",
          "Toggle Display",
          <HeavyLoaderNoSSR />,
        )}
      </section>
      <section>
        <h3>Using React 18 Suspense</h3>
        {renderShownComponent(
          "suspense",
          "Toggle Suspense Display",
          <SuspenseNoSSR />,
        )}
      </section>
      <section>
        <h3>Testing React Tracked</h3>

        {renderShownComponent(
          "reactTracked",
          "Toggle React Tracked",
          <ReactTrackedNoSSR />,
        )}
      </section>
      <section>
        <h3>Large Form Handling</h3>

        {renderShownComponent(
          "largeForm",
          "Toggle Large Form",
          <LargeFormNoSSR />,
        )}
      </section>
      <section>
        <h3>Large Form Handling with React-Tracked</h3>

        {renderShownComponent(
          "largeForm2",
          "Toggle Large Form 2",
          <LargeForm2NoSSR />,
        )}
      </section>
    </div>
  )
}

export default Performance
