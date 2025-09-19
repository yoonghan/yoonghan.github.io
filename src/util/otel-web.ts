"use client"

import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http"
import { WebTracerProvider } from "@opentelemetry/sdk-trace-web"
import { BatchSpanProcessor } from "@opentelemetry/sdk-trace-base"
import { registerInstrumentations } from "@opentelemetry/instrumentation"
import { FetchInstrumentation } from "@opentelemetry/instrumentation-fetch"
import { ZoneContextManager } from "@opentelemetry/context-zone"
import { site } from "@/config/site"
import {
  type Resource,
  type RawResourceAttribute,
} from "@opentelemetry/resources"

export const initOpenTelemetry = (window: Window | undefined) => {
  if (typeof window !== "undefined") {
    const spanProcessor = new BatchSpanProcessor(
      new OTLPTraceExporter({
        url: `${site.apiUrl}/otel`,
      }),
    )

    const provider = new WebTracerProvider({
      resource: {
        attributes: {
          "service-name": "web",
        },
        merge: function (other: Resource | null): Resource {
          throw new Error("Function not implemented.")
        },
        getRawAttributes: function (): RawResourceAttribute[] {
          throw new Error("Function not implemented.")
        },
      },
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
