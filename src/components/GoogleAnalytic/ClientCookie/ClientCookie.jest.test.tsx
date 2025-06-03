import { render, screen } from "@testing-library/react"
import ClientCookie from "."
import userEvent from "@testing-library/user-event"
import { site } from "@/config/site"
import ReactGA from "react-ga4"

describe("Client Cookie", () => {
  const expectedCookieValue =
    "termsGranted=true;secure;path=/;SameSite=Lax;max-age=2592000"

  beforeAll(() => {
    //allow cookie to be re-written
    Object.defineProperty(window.document, "cookie", {
      writable: true,
    })
  })

  afterAll(() => {
    Object.defineProperty(window.document, "cookie", {
      writable: false,
    })
  })

  const renderComponent = () => render(<ClientCookie ga4Id={site.ga4Id} />)

  const assertCookie = () => {
    expect(document.cookie).toBe(expectedCookieValue)
  }

  it("should show cookie message", () => {
    const gtagFn = jest.fn()
    jest.spyOn(ReactGA, "gtag").mockImplementation(gtagFn)
    renderComponent()
    expect(screen.getByText("This site uses cookies.")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Accept" })).toBeInTheDocument()
    expect(gtagFn).toHaveBeenCalledWith("consent", "default", {
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      analytics_storage: "denied",
    })
  })

  it("should show hide message when Accept button is clicked", async () => {
    const gtagFn = jest.fn()
    jest.spyOn(ReactGA, "gtag").mockImplementation(gtagFn)
    renderComponent()
    await userEvent.click(screen.getByRole("button", { name: "Accept" }))
    expect(
      screen.queryByText("This site uses cookies."),
    ).not.toBeInTheDocument()
    assertCookie()
    expect(gtagFn).toHaveBeenCalledTimes(2)
    expect(gtagFn).toHaveBeenCalledWith("consent", "update", {
      analytics_storage: "granted",
    })
  })

  it("should not show message if cookie is already set and cookie is called twice", async () => {
    const gtagFn = jest.fn()
    jest.spyOn(ReactGA, "gtag").mockImplementation(gtagFn)
    Object.defineProperty(window.document, "cookie", {
      writable: true,
      value: expectedCookieValue,
    })
    renderComponent()
    expect(
      screen.queryByText("This site uses cookies."),
    ).not.toBeInTheDocument()
    expect(gtagFn).toHaveBeenCalledTimes(2)
    expect(gtagFn).toHaveBeenCalledWith("consent", "default", {
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      analytics_storage: "denied",
    })
    expect(gtagFn).toHaveBeenCalledWith("consent", "update", {
      analytics_storage: "granted",
    })
  })

  it("should not show message if cookie read cookie has extra attribute", async () => {
    Object.defineProperty(window.document, "cookie", {
      writable: true,
      value: `specialCookie=1; ${expectedCookieValue}`,
    })
    renderComponent()
    expect(
      screen.queryByText("This site uses cookies."),
    ).not.toBeInTheDocument()
  })
})
