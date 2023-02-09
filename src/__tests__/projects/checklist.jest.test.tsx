import { render, screen, fireEvent, within } from "@testing-library/react"
import Checklist from "@/pages/projects/checklist"
import { assertFooter } from "../utils/_footer"
import { assertMenu } from "../utils/_menu"
import { assertScrollToTop } from "../utils/_scrollToTop"

jest.mock("next/router", () => require("next-router-mock"))

describe("Checklist links", () => {
  const renderComponent = () => {
    render(<Checklist />)
  }

  it("should have a menu and scroll to top", async () => {
    renderComponent()
    await assertMenu()
    await assertScrollToTop()
  })

  it("should render the page with the important components", () => {
    renderComponent()
    expect(screen.getByText("Important Checklist Links"))
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
