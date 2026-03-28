"use client"

import { initOpenTelemetry } from "@/util/otel-web"
import { useEffect } from "react"

export default function OtelProvider({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  useEffect(() => {
    initOpenTelemetry(globalThis)
  }, [])

  return <>{children}</>
}
