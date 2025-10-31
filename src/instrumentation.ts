// /* eslint-disable @typescript-eslint/no-require-imports */
// export function register() {
//   if (process.env.NEXT_RUNTIME === "nodejs") {
//     const { NodeSDK } = require("@opentelemetry/sdk-node")
//     const {
//       getNodeAutoInstrumentations,
//     } = require("@opentelemetry/auto-instrumentations-node")
//     const {
//       OTLPTraceExporter,
//     } = require("@opentelemetry/exporter-trace-otlp-http")

//     const sdk = new NodeSDK({
//       serviceName: "api",
//       traceExporter: new OTLPTraceExporter({
//         url: "https://api.axiom.co/v1/traces",
//         headers: {
//           Authorization: `Bearer ${process.env.AXIOM_API_TOKEN}`,
//           "X-Axiom-Dataset": `${process.env.AXIOM_DATASET_NAME}`,
//         },
//       }),
//       instrumentations: [getNodeAutoInstrumentations()],
//     })

//     sdk.start()
//   }
// }
