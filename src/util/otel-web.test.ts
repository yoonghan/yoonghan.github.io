import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http"
import { WebTracerProvider } from "@opentelemetry/sdk-trace-web"
import { BatchSpanProcessor } from "@opentelemetry/sdk-trace-base"
import { registerInstrumentations } from "@opentelemetry/instrumentation"
import { FetchInstrumentation } from "@opentelemetry/instrumentation-fetch"
import { initOpenTelemetry } from "./otel-web"
import { ZoneContextManager } from "@opentelemetry/context-zone"

jest.mock("@opentelemetry/exporter-trace-otlp-http", () => ({
  OTLPTraceExporter: jest.fn(),
}))

jest.mock("@opentelemetry/sdk-trace-web", () => ({
  WebTracerProvider: jest.fn().mockImplementation(() => ({
    addSpanProcessor: jest.fn(),
    register: jest.fn(),
  })),
}))

jest.mock("@opentelemetry/sdk-trace-base", () => ({
  BatchSpanProcessor: jest.fn(),
}))

jest.mock("@opentelemetry/instrumentation", () => ({
  registerInstrumentations: jest.fn(),
}))

jest.mock("@opentelemetry/instrumentation-fetch", () => ({
  FetchInstrumentation: jest.fn(),
}))

jest.mock("@opentelemetry/context-zone", () => ({
  ZoneContextManager: jest.fn(),
}))

describe("otel-web", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("should initialize OpenTelemetry when window is defined", () => {
    initOpenTelemetry(window)

    expect(WebTracerProvider).toHaveBeenCalledWith({
      spanProcessors: [expect.any(Object)],
    })
    expect(BatchSpanProcessor).toHaveBeenCalled()
    expect(OTLPTraceExporter).toHaveBeenCalled()
    expect(registerInstrumentations).toHaveBeenCalledWith({
      instrumentations: [expect.any(Object)],
    })
    expect(FetchInstrumentation).toHaveBeenCalled()
    expect(ZoneContextManager).toHaveBeenCalled()
  })

  it("should not initialize OpenTelemetry when window is undefined", () => {
    initOpenTelemetry(undefined)

    expect(WebTracerProvider).not.toHaveBeenCalled()
  })
})
