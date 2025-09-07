import { render, screen } from "@testing-library/react"
import StickyCards from "."

describe("StickyCards", () => {
  it("should render scrollable correctly", () => {
    render(
      <StickyCards
        contents={[
          {
            label: "One",
            className: "class-1",
            text: "One description",
            href: "link",
          },
          {
            label: "Two",
            className: "class-2",
            text: "Two description",
          },
        ]}
      />,
    )

    expect(screen.getByText("One")).toBeInTheDocument()
    expect(screen.getByText("One description")).toBeInTheDocument()
    expect(
      screen.getByRole("link", { name: "View Arrow icon" }),
    ).toBeInTheDocument()

    expect(screen.getByText("Two")).toBeInTheDocument()
    // eslint-disable-next-line testing-library/no-node-access
    expect(screen.getByText("Two").parentNode).toHaveClass("class-2")
    expect(screen.getByText("Two description")).toBeInTheDocument()
  })
})
