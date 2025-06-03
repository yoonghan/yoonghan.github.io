import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http"
import { SimpleSpanProcessor } from "@opentelemetry/sdk-trace-node"
import { registerOTel } from "@vercel/otel"

export function register() {
  registerOTel({
    serviceName: "walcron-nextjs-web",
    spanProcessors: [
      new SimpleSpanProcessor(
        new OTLPTraceExporter({
          url: "https://api.axiom.co/v1/traces",
          headers: {
            Authorization: `Bearer ${process.env.AXIOM_API_TOKEN}`,
            "X-Axiom-Dataset": `${process.env.AXIOM_DATASET_NAME}`,
          },
        }),
      ),
    ],
  })
}
