"use client"

import ReactGA from "react-ga4"
import { reportWebVitals } from "@yoonghan/walcron-microfrontend-shared"
import ClientCookie from "./ClientCookie"
import { useEffect } from "react"

interface Props {
  ga4Id: string
}

export function GoogleAnalytic({ ga4Id }: Readonly<Props>) {
  useEffect(() => {
    ReactGA.initialize(ga4Id)

    /* 
    // Do not move outside of useEffect
    // Generate PWA will have issue as document is missing.
    // Moving out doesn't make difference as CLS and LCP are sent only on reload and INP is sent regularly.
    */
    reportWebVitals(({ name, delta, id, value }) => {
      ReactGA.event(name, {
        value: delta,
        metric_id: id,
        metric_value: value,
        metric_delta: Math.floor(delta),
      })
    })
  }, [ga4Id])

  return <ClientCookie ga4Id={ga4Id} />
}
