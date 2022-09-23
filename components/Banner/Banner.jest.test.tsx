import { render, screen } from "@testing-library/react"
import Banner from "."

describe("Banner", () => {
  it("renders a header", () => {
    render(<Banner />)
    expect(screen.getByText("Walcron will be back online")).toBeInTheDocument()
  })
})
