import { render, screen } from "@testing-library/react"
import InvalidCommand from "./InvalidCommand"

describe("Output", () => {
  it("should render output text", () => {
    render(<InvalidCommand invalidCommand="Oops" />)
    expect(screen.getByText("Msg: Oops"))
  })
})
