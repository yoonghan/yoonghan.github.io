import { render, screen } from "@testing-library/react"
import StickyCards from "."

describe("StickyCards", () => {
  it("should render scrollable correctly", () => {
    render(
      <StickyCards
        contents={[<div key={0}>One</div>, <div key={1}>Two</div>]}
      />
    )

    expect(screen.getByText("One")).toBeInTheDocument()
    expect(screen.getByText("Two")).toBeInTheDocument()
  })
})
