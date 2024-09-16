import Aria from "./page"
import { render, screen } from "@testing-library/react"

describe("Aria", () => {
  it("should render page correctly", async () => {
    render(<Aria />)
    expect(screen.getByText("Accessibility (WCAG)")).toBeInTheDocument()
  })
})
