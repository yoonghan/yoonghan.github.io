import { render, screen } from "@testing-library/react"
import StickyCards from "."

describe("StickyCards", () => {
  it("should render scrollable correctly", () => {
    render(
      <StickyCards
        contents={[
          {
            title: "One",
            className: "class-1",
            description: "One description",
            href: "link",
          },
          {
            title: "Two",
            className: "class-2",
            description: "Two description",
          },
        ]}
      />
    )

    expect(screen.getByText("One")).toBeInTheDocument()
    expect(screen.getByText("One description")).toBeInTheDocument()
    expect(
      screen.getByRole("link", { name: "View Arrow icon" })
    ).toBeInTheDocument()

    expect(screen.getByText("Two")).toBeInTheDocument()
    // eslint-disable-next-line testing-library/no-node-access
    expect(screen.getByText("Two").parentNode).toHaveClass("class-2")
    expect(screen.getByText("Two description")).toBeInTheDocument()
  })
})
