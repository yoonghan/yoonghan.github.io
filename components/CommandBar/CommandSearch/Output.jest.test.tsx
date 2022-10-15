import { render, screen } from "@testing-library/react"
import Output from "./Output"

describe("Output", () => {
  it("should render output text", () => {
    render(<Output output={"Hi There"} />)
    expect(screen.getByText("Output: Hi There"))
  })
})
