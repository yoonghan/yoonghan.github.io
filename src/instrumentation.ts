import { NodeSDK } from "@opentelemetry/sdk-node"
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node"
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http"

export function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const sdk = new NodeSDK({
      serviceName: "api",
      traceExporter: new OTLPTraceExporter({
        url: "https://api.axiom.co/v1/traces",
        headers: {
          Authorization: `Bearer ${process.env.AXIOM_API_TOKEN}`,
          "X-Axiom-Dataset": `${process.env.AXIOM_DATASET_NAME}`,
        },
      }),
      instrumentations: [getNodeAutoInstrumentations()],
    })

    sdk.start()
  }
}
