import { render, screen } from "@testing-library/react"
import Grid from "."

describe("Grid", () => {
  const renderComponent = () => render(<Grid />)

  it("should render", () => {
    renderComponent()
    expect(screen.getByText("Grid")).toBeInTheDocument()
  })
})
