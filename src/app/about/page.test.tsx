import { render, screen } from "@testing-library/react"
import About from "./page"
import { assertScrollToTop } from "@/__tests__/utils/_scrollToTop"

describe("About", () => {
  const renderComponent = () => {
    render(<About />)
  }

  it("should have a menu and scroll to top", async () => {
    renderComponent()
    await assertScrollToTop()
  })

  it("should render the page with the important components", () => {
    renderComponent()
    expect(screen.getAllByText("About Us")).toHaveLength(2)
    expect(screen.getAllByText("Founders")).toHaveLength(2)
    expect(screen.getAllByText("Certifications")).toHaveLength(2)
  })

  it("should be able to scroll up", () => {
    renderComponent()
    assertScrollToTop()
  })
})
