import { render, screen } from "@testing-library/react"
import Link from "."

describe("Link", () => {
  it("renders a link with text", () => {
    render(<Link text="I am just a text" />)
    expect(screen.getByText("I am just a text")).toBeInTheDocument()
  })

  it("renders a link with text and href", () => {
    render(<Link text="I am a link" href="/link" />)
    expect(screen.getByText("I am a link")).toHaveAttribute("href", "/link")
  })

  it("renders a link with text and logo + alt", () => {
    render(
      <Link
        text="I am a logo link"
        logoUrl="http://external.png"
        logoAltText="Link Icon"
      />
    )
    expect(screen.getByText("I am a logo link")).toBeInTheDocument()
    expect(screen.getByRole("img", { name: "Link Icon" })).toHaveAttribute(
      "src"
    )
  })
})
