import "@/__tests__/mocks/walcron-microfrontend-shared"
import { render } from "@testing-library/react"
import ReactGA from "react-ga4"
import { GoogleAnalytic } from "."

describe("Google Analytic", () => {
	it("should send event for every reload", () => {
		const gaValue = "123"
		const initializeMock = vi.fn()
		const eventMock = vi.fn()
		vi.spyOn(ReactGA, "initialize").mockImplementation(initializeMock)
		vi.spyOn(ReactGA, "event").mockImplementation(eventMock)

		const { rerender } = render(<GoogleAnalytic ga4Id={gaValue} />)
		expect(initializeMock).toHaveBeenCalledTimes(2)
		expect(initializeMock).toHaveBeenCalledWith(gaValue)
		//first needs to be consent
		expect(eventMock).toHaveBeenCalledWith("CLS", {
			metric_delta: 1,
			metric_id: "test",
			metric_value: 2,
			value: 1.1,
		})

		rerender(<GoogleAnalytic ga4Id={gaValue} />)
		//first needs to be consent
		expect(initializeMock).toHaveBeenCalledTimes(2)
		expect(eventMock).toHaveBeenCalledTimes(1)
	})
})