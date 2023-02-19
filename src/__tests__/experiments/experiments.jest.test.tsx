import Experiment from "@/pages/experiments"
import { render, screen } from "@testing-library/react"
import { assertMenu } from "../utils/_menu"
import { assertScrollToTop } from "../utils/_scrollToTop"

jest.mock("next/router", () => require("next-router-mock"))

describe("Experiments", () => {
  const renderComponent = () => {
    render(<Experiment />)
  }

  it("should have a menu and scroll to top", async () => {
    renderComponent()
    await assertMenu()
    await assertScrollToTop()
  })

  it("should render page correctly", async () => {
    render(<Experiment />)
    expect(screen.getByText("Experimental projects")).toBeInTheDocument()
  })
})
