import { render, screen, fireEvent } from "@testing-library/react"
import About from "@/pages/about"
import { assertFooter } from "./utils/_footer"
import { assertMenu } from "./utils/_menu"
import { assertScrollToTop } from "./utils/_scrollToTop"

jest.mock("next/router", () => require("next-router-mock"))

describe("About", () => {
  const renderComponent = () => {
    render(<About />)
  }

  it("should have a menu and scroll to top", async () => {
    renderComponent()
    await assertMenu()
    await assertScrollToTop()
  })

  it("should render the page with the important components", () => {
    renderComponent()
    expect(screen.getAllByText("About Us")).toHaveLength(3)
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

  it("should render the page with footer", () => {
    renderComponent()
    assertFooter()
  })
})
