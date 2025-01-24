import { render, screen } from "@testing-library/react"
import "@/__tests__/mocks/routerMock"
import HomePage from "."

describe("HomePage", () => {
  const renderComponent = () => {
    render(<HomePage />)
  }

  it("should have a social fab loaded", async () => {
    renderComponent()
    expect(await screen.findByRole("link", { name: "git" })).toBeInTheDocument()
  })

  describe("reliability section", () => {
    it("can navigate for reliability", () => {
      const title = "Reliable Deployment"
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
      const title = "Accessibility (WCAG)"
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
