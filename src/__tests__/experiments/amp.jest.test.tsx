import Amp from "@/app/experiments/amp/page"
import { render, screen } from "@testing-library/react"

describe("Amp", () => {
  it("should render page correctly to inform we are in development phase", () => {
    render(<Amp />)
    expect(
      screen.getByText("Currently we are still in development phase for AMP.")
    ).toBeInTheDocument()
  })
})
