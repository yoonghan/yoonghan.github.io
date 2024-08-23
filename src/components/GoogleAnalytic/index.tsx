"use client"

import ReactGA from "react-ga4"
import { reportWebVitals } from "@yoonghan/walcron-microfrontend-shared"
import { useEffect } from "react"

interface Props {
  gaId: string
}

export function GoogleAnalytic({ gaId }: Props) {
  ReactGA.initialize(gaId)

  //https://pilotdigital.com/blog/how-to-monitor-core-web-vitals-in-google-analytics/
  useEffect(() => {
    reportWebVitals(({ name, delta, id }) => {
      ReactGA.event("web_vitals", {
        cwv_metric: name,
        cwv_value: delta,
        cwv_id: id,
      })
    })
  }, [])

  return null
}
