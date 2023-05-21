import Experiment from "@/app/experiments/page"
import { render, screen } from "@testing-library/react"
import { assertScrollToTop } from "../utils/_scrollToTop"

describe("Experiments", () => {
  const renderComponent = () => {
    render(<Experiment />)
  }

  it("should have a menu and scroll to top", async () => {
    renderComponent()
    await assertScrollToTop()
  })

  it("should render page correctly", async () => {
    render(<Experiment />)
    expect(screen.getByText("Experimental projects")).toBeInTheDocument()
  })
})
