"use client"

import ReactGA from "react-ga4"
import { reportWebVitals } from "@yoonghan/walcron-microfrontend-shared"
import { useEffect } from "react"
import ClientCookie from "./ClientCookie"

interface Props {
  ga4Id: string
}

export function GoogleAnalytic({ ga4Id }: Props) {
  ReactGA.initialize(ga4Id)

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

  return <ClientCookie ga4Id={ga4Id} />
}
