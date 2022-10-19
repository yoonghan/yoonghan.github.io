import { render, screen } from "@testing-library/react"
import HeaderOne from "."

describe("HeaderOne", () => {
  it("should render with given title", () => {
    render(<HeaderOne title="Aizawa" />)
    expect(screen.getByText("Aizawa")).toBeInTheDocument()
  })

  it("should render a title with a line", () => {
    render(<HeaderOne title="Mizumi" isLined={true} />)
    expect(screen.getByText("Mizumi")).toHaveClass("lined")
  })
})
