"use client"

import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http"
import { WebTracerProvider } from "@opentelemetry/sdk-trace-web"
import { BatchSpanProcessor } from "@opentelemetry/sdk-trace-base"
import { registerInstrumentations } from "@opentelemetry/instrumentation"
import { FetchInstrumentation } from "@opentelemetry/instrumentation-fetch"
import { ZoneContextManager } from "@opentelemetry/context-zone"
import { site } from "@/config/site"

export const initOpenTelemetry = (window: Window | undefined) => {
  if (typeof window !== "undefined") {
    const spanProcessor = new BatchSpanProcessor(
      new OTLPTraceExporter({
        url: `${site.apiUrl}/otel`,
      }),
    )

    const provider = new WebTracerProvider({
      spanProcessors: [spanProcessor],
    })

    provider.register({
      contextManager: new ZoneContextManager(),
    })

    registerInstrumentations({
      instrumentations: [new FetchInstrumentation()],
    })
  }
}
