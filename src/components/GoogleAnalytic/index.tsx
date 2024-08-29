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

  useEffect(() => {
    reportWebVitals(({ name, delta, id, value }) => {
      ReactGA.event(name, {
        value: Math.floor(delta),
        metric_id: id,
        metric_value: value,
        metric_delta: delta,
      })
    })
  }, [])

  return <ClientCookie ga4Id={ga4Id} />
}
