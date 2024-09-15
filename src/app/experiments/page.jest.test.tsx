import Experiment from "./page"
import { render, screen } from "@testing-library/react"
import { assertScrollToTop } from "@/__tests__/utils/_scrollToTop"

describe("Experiments", () => {
  it("should render page correctly", async () => {
    render(<Experiment />)
    await assertScrollToTop()
    expect(screen.getByText("Experimental projects")).toBeInTheDocument()
  })
})
