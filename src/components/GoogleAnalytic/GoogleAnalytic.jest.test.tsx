import "@/__tests__/mocks/walcron-microfrontend-shared"
import { render } from "@testing-library/react"
import { GoogleAnalytic } from "."
import ReactGA from "react-ga4"

describe("Google Analytic", () => {
  it("should send event on load", () => {
    const gaValue = "123"
    const initializeMock = jest.fn()
    const eventMock = jest.fn()
    const gtagMock = jest.fn()
    jest.spyOn(ReactGA, "initialize").mockImplementation(initializeMock)
    jest.spyOn(ReactGA, "event").mockImplementation(eventMock)
    jest.spyOn(ReactGA, "gtag").mockImplementation(gtagMock)

    render(<GoogleAnalytic ga4Id={gaValue} />)
    expect(initializeMock).toHaveBeenCalledWith(gaValue)
    expect(eventMock).toHaveBeenCalledWith("web_vitals", {
      cwv_metric: "CLS",
      cwv_value: 1,
      cwv_id: "test",
    })
    //first needs to be consent
    expect(gtagMock).toHaveBeenNthCalledWith(2, "event", "CLS", {
      metric_delta: 1,
      metric_id: "test",
      metric_value: 2,
      value: 1,
    })
  })
})
