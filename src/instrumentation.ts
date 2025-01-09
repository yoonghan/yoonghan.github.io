import { registerOTel } from "@vercel/otel"
import { SamplingDecision } from "@opentelemetry/sdk-trace-base"
import { trace, Context } from "@opentelemetry/api"

export function register() {
  registerOTel({
    serviceName: "acme-next-app",
    traceExporter: "auto",
    spanProcessors: ["auto"],
    traceSampler: {
      shouldSample: (context: Context) => {
        const isChecklySpan = trace
          .getSpan(context)
          ?.spanContext()
          ?.traceState?.get("checkly")
        if (isChecklySpan) {
          // eslint-disable-next-line no-console
          console.log(
            "Sampling decision for Checkly span:",
            SamplingDecision.RECORD_AND_SAMPLED
          )
          return {
            decision: SamplingDecision.RECORD_AND_SAMPLED,
          }
        } else {
          // eslint-disable-next-line no-console
          console.log(
            "Sampling decision for non-Checkly span:",
            SamplingDecision.NOT_RECORD
          )
          return {
            decision: SamplingDecision.NOT_RECORD,
          }
        }
      },
    },
  })
}
