import { render, screen } from "@testing-library/react"
import Banner from "."

describe("Banner", () => {
  it("renders a header", () => {
    render(<Banner />)
    expect(
      screen.getByText("Currently we are under-construction")
    ).toBeInTheDocument()
  })

  it("renders can accept children", () => {
    render(
      <Banner>
        <span>I am a child</span>
      </Banner>
    )
    expect(screen.getByText("I am a child")).toBeInTheDocument()
  })
})
