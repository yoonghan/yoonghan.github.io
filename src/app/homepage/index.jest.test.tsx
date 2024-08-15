import { render, screen, waitFor, within } from "@testing-library/react"
import "@/__tests__/mocks/routerMock"
import HomePage from "."
import userEvent from "@testing-library/user-event"

describe("HomePage", () => {
  const renderComponent = () => {
    render(<HomePage />)
  }

  it("should be able to load and accept cookie", async () => {
    const cookieText = "This site uses cookies."

    renderComponent()
    const cookieSection = await screen.findByTestId("cookie-dialog")
    expect(within(cookieSection).getByText(cookieText)).toBeInTheDocument()
    await userEvent.click(
      within(cookieSection).getByRole("button", { name: "Accept" })
    )
    expect(
      within(cookieSection).queryByText(cookieText)
    ).not.toBeInTheDocument()
  })

  it("should have a social fab loaded", async () => {
    renderComponent()
    expect(await screen.findByRole("link", { name: "git" })).toBeInTheDocument()
  })

  describe("reliability section", () => {
    it("can navigate for reliability", () => {
      const title = "Reliability"
      const link = "reliability"
      renderComponent()
      expect(screen.getByRole("link", { name: title })).toHaveAttribute(
        "href",
        `#${link}`
      )
      expect(screen.getByRole("heading", { name: title })).toHaveAttribute(
        "id",
        link
      )
    })
  })

  describe("accessibility section", () => {
    it("can navigate for accessibility", () => {
      const title = "Accessibility and Readability (WCAG)"
      const link = "accessibility"
      renderComponent()
      expect(screen.getByRole("link", { name: title })).toHaveAttribute(
        "href",
        `#${link}`
      )
      expect(screen.getByRole("heading", { name: title })).toHaveAttribute(
        "id",
        link
      )
    })
  })

  describe("monitoring section", () => {
    it("can navigate for monitoring", () => {
      const title = "Monitoring"
      const link = "monitoring"
      renderComponent()
      expect(screen.getByRole("link", { name: title })).toHaveAttribute(
        "href",
        `#${link}`
      )
      expect(screen.getByRole("heading", { name: title })).toHaveAttribute(
        "id",
        link
      )
    })
  })

  describe("performance section", () => {
    it("can navigate for performance", () => {
      const title = "Performance"
      const link = "performance"
      renderComponent()
      expect(screen.getByRole("link", { name: title })).toHaveAttribute(
        "href",
        `#${link}`
      )
      expect(screen.getByRole("heading", { name: title })).toHaveAttribute(
        "id",
        link
      )
    })
  })
})
