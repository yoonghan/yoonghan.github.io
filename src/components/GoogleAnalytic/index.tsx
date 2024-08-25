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
  //https://github.com/google-marketing-solutions/web-vitals-gtm-template
  useEffect(() => {
    reportWebVitals(({ name, delta, id, value }) => {
      ReactGA.event("web_vitals", {
        cwv_metric: name,
        cwv_value: delta,
        cwv_id: id,
      })
      ReactGA.gtag("event", name, {
        value: delta,
        metric_id: id,
        metric_value: value,
        metric_delta: delta,
      })
    })
  }, [])

  return <ClientCookie ga4Id={ga4Id} />
}
