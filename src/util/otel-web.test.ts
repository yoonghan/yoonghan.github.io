import { ZoneContextManager } from "@opentelemetry/context-zone"
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http"
import { registerInstrumentations } from "@opentelemetry/instrumentation"
import { FetchInstrumentation } from "@opentelemetry/instrumentation-fetch"
import { BatchSpanProcessor } from "@opentelemetry/sdk-trace-base"
import { WebTracerProvider } from "@opentelemetry/sdk-trace-web"
import { initOpenTelemetry } from "./otel-web"

vi.mock("@opentelemetry/exporter-trace-otlp-http", () => ({
	OTLPTraceExporter: vi.fn(),
}))

vi.mock("@opentelemetry/sdk-trace-web", () => ({
	WebTracerProvider: vi.fn().mockImplementation(function () {
		return {
			addSpanProcessor: vi.fn(),
			register: vi.fn(),
		}
	}),
}))

vi.mock("@opentelemetry/sdk-trace-base", () => ({
	BatchSpanProcessor: vi.fn(),
}))

vi.mock("@opentelemetry/instrumentation", () => ({
	registerInstrumentations: vi.fn(),
}))

vi.mock("@opentelemetry/instrumentation-fetch", () => ({
	FetchInstrumentation: vi.fn(),
}))

vi.mock("@opentelemetry/context-zone", () => ({
	ZoneContextManager: vi.fn(),
}))

describe("otel-web", () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	it("should initialize OpenTelemetry when window is defined", () => {
		initOpenTelemetry(globalThis)
		expect(WebTracerProvider).toHaveBeenCalled()
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