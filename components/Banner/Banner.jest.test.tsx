import { render, screen } from "@testing-library/react"
import Banner from "."

describe("Banner", () => {
  it("renders a header", () => {
    render(<Banner />)
    expect(
      screen.getByText("Currently we are under-construction")
    ).toBeInTheDocument()
  })
})
