import { render } from "@testing-library/react"
import OtelProvider from "."
import { initOpenTelemetry } from "@/util/otel-web"

jest.mock("@/util/otel-web", () => ({
  initOpenTelemetry: jest.fn(),
}))

describe("OtelProvider", () => {
  it("should call initOpenTelemetry on mount", () => {
    render(
      <OtelProvider>
        <div>child</div>
      </OtelProvider>,
    )
    expect(initOpenTelemetry).toHaveBeenCalled()
  })
})
