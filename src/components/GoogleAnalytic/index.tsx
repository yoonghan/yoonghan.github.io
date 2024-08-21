"use client"

import ReactGA from "react-ga4"
import { reportWebVitals } from "@yoonghan/walcron-microfrontend-shared"
import { useEffect } from "react"

interface Props {
  gaId: string
}

export function GoogleAnalytic({ gaId }: Props) {
  ReactGA.initialize(gaId)

  useEffect(() => {
    reportWebVitals(({ name, delta, id }) => {
      ReactGA.event(name, {
        value: delta,
        metric_id: id,
      })
    })
  }, [])

  return null
}
