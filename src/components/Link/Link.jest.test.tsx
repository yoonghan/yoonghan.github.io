import { render, screen } from "@testing-library/react"
import Link from "."

describe("Link", () => {
  it("renders a link with text", () => {
    render(<Link>I am just a text</Link>)
    expect(screen.getByText("I am just a text")).toBeInTheDocument()
  })

  it("renders a link with text and href", () => {
    render(
      <Link href="/link" prefetch={true}>
        I am a logo link
      </Link>
    )
    expect(screen.getByText("I am a logo link")).toHaveAttribute(
      "href",
      "/link"
    )
  })

  it("renders a link with text and logo + alt", () => {
    render(
      <Link logoUrl="http://external.png" logoAltText="Link Icon">
        I am a logo link
      </Link>
    )
    expect(screen.getByText("I am a logo link")).toBeInTheDocument()
    expect(screen.getByRole("img", { name: "Link Icon" })).toHaveAttribute(
      "src"
    )
  })
})
