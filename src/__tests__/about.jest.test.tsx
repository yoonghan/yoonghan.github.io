import { render, screen, fireEvent } from "@testing-library/react"
import About from "@/app/about/page"
import { assertScrollToTop } from "./utils/_scrollToTop"

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
    expect(screen.getByText("About Us")).toBeInTheDocument()
    expect(screen.getByText("The developers")).toBeInTheDocument()
    expect(
      screen.getByText(
        "If you are interested to talk to us, leave us your contact. Let us reach you instead."
      )
    ).toBeInTheDocument()
  })

  it("should be able to scroll up", () => {
    renderComponent()
    expect(screen.queryByText("Up")).not.toBeInTheDocument()
    fireEvent.scroll(window, { target: { pageYOffset: 321 } })
    expect(screen.getByText("Up")).toBeInTheDocument()
  })
})
