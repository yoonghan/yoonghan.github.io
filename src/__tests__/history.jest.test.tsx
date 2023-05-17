import { render, screen, fireEvent } from "@testing-library/react"
import "../__mocks__/routerMock"
import History from "@/app/history/page"
import { metadata } from "@/app/history/layout"
import { assertScrollToTop } from "./utils/_scrollToTop"

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
    expect(screen.queryByText("Up")).not.toBeInTheDocument()
    fireEvent.scroll(window, { target: { pageYOffset: 321 } })
    expect(screen.getByText("Up")).toBeInTheDocument()
  })
})
