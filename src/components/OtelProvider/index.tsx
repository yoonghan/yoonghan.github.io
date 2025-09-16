"use client"

import { initOpenTelemetry } from "@/util/otel-web"
import { useEffect } from "react"

export default function OtelProvider({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    initOpenTelemetry(window)
  }, [])

  return <>{children}</>
}
