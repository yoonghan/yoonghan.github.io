import { render, screen } from "@testing-library/react"
import InvalidInput from "./InvalidInput"

describe("InvalidInput", () => {
  it("should render correctly", () => {
    render(<InvalidInput invalidInput={"no"} />)
    expect(screen.getByText("no - not found. type HELP.")).toBeInTheDocument()
  })

  it("should trim long input values", () => {
    render(<InvalidInput invalidInput={"noqweqw"} />)
    expect(
      screen.getByText("noqw... - not found. type HELP."),
    ).toBeInTheDocument()
  })
})
