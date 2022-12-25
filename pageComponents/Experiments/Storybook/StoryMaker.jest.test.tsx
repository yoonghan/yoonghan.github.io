import { render, screen } from "@testing-library/react"
import StoryMaker from "./StoryMaker"

describe("StoryMaker", () => {
  it("should render elements correctly", () => {
    render(
      <StoryMaker
        items={[{ title: "Sample Title", component: <div>Sample Body</div> }]}
      />
    )
    expect(screen.getByTitle("Sample Title")).toBeInTheDocument()
    expect(screen.getByText("Sample Body")).toBeInTheDocument()
  })
})
