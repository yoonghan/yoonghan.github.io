import "@/__tests__/mocks/walcron-microfrontend-shared"
import { render } from "@testing-library/react"
import { GoogleAnalytic } from "."
import ReactGA from "react-ga4"

describe("Google Analytic", () => {
  it("should send event on load", () => {
    const gaValue = "123"
    const initializeMock = jest.fn()
    const eventMock = jest.fn()
    jest.spyOn(ReactGA, "initialize").mockImplementation(initializeMock)
    jest.spyOn(ReactGA, "event").mockImplementation(eventMock)

    render(<GoogleAnalytic ga4Id={gaValue} />)
    expect(initializeMock).toHaveBeenCalledWith(gaValue)
    //first needs to be consent
    expect(eventMock).toHaveBeenCalledWith("CLS", {
      metric_delta: 1,
      metric_id: "test",
      metric_value: 2,
      value: 1,
    })
  })
})
