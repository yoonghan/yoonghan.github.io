import { render, screen } from "@testing-library/react"
import LogoText from "."

describe("LogoText", () => {
  it("should render the logo text correctly", () => {
    render(<LogoText />)
    expect(screen.getByText("Walcron")).toBeInTheDocument()
  })
})
