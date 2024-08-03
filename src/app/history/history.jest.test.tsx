import { render, screen, fireEvent } from "@testing-library/react"
import History from "./page"
import { assertScrollToTop } from "@/__tests__/utils/_scrollToTop"

describe("History", () => {
  const renderComponent = () => {
    render(<History />)
  }

  it("should have a menu and scroll to top", async () => {
    renderComponent()
    await assertScrollToTop()
  })

  it("should render the page with the important components", () => {
    renderComponent()
    expect(screen.getByText("Site's history")).toBeInTheDocument()
    expect(screen.getByText("Motivational books")).toBeInTheDocument()
  })

  it("should be able to scroll up", async () => {
    renderComponent()
    assertScrollToTop()
  })
})
