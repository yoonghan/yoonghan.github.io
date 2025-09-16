"use client"

import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http"
import { WebTracerProvider } from "@opentelemetry/sdk-trace-web"
import { BatchSpanProcessor } from "@opentelemetry/sdk-trace-base"
import { registerInstrumentations } from "@opentelemetry/instrumentation"
import { FetchInstrumentation } from "@opentelemetry/instrumentation-fetch"
import { ZoneContextManager } from "@opentelemetry/context-zone"

export const initOpenTelemetry = (window: Window | undefined) => {
  if (typeof window !== "undefined") {
    const spanProcessor = new BatchSpanProcessor(
      new OTLPTraceExporter({
        url: "https://api.axiom.co/v1/traces",
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_AXIOM_API_TOKEN}`,
          "X-Axiom-Dataset": `${process.env.NEXT_PUBLIC_AXIOM_DATASET_NAME}`,
        },
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
