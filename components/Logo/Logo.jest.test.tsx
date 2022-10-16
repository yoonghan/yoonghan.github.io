import { render, screen } from "@testing-library/react"
import Logo from "."

describe("Logo", () => {
  it("should render with text correctly", () => {
    render(<Logo withText={true} />)
    expect(screen.getByRole("img", { name: "walcron-logo" }))
    expect(screen.getByText("Walcron")).toBeInTheDocument()
  })

  it("should render without text correctly", () => {
    render(<Logo />)
    expect(screen.getByRole("img", { name: "walcron-logo" }))
    expect(screen.queryByText("Walcron")).not.toBeInTheDocument()
  })
})
