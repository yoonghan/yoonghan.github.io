import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Button from "./"

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ href, children }: { href: string; children: any }) => {
    return (
      <a href={href} data-testid="next-link">
        {children}
      </a>
    )
  },
}))

describe("Button", () => {
  it("should render the button text", () => {
    render(<Button text="Button Text" />)
    expect(screen.getByRole("button")).toHaveTextContent("Button Text")
  })

  it("should render the button which is clickable", async () => {
    const clickFn = jest.fn()
    render(<Button text="Click Me" onClick={clickFn} />)
    await userEvent.click(screen.getByRole("button", { name: "Click Me" }))
    expect(clickFn).toHaveBeenCalled()
  })

  it("should render the button with external href", async () => {
    render(<Button text="Link Me" href={"http://www.google.com"} />)
    const linkButton = screen.getByRole("link", { name: "Link Me" })
    expect(linkButton).toHaveAttribute("href", "http://www.google.com")

    expect(linkButton).toHaveAttribute("target", "_self")
  })

  it("should render the button with external href with target", async () => {
    render(
      <Button text="Link Me" href={"http://www.google.com"} target={"_blank"} />
    )
    const linkButton = screen.getByRole("link", { name: "Link Me" })
    expect(linkButton).toHaveAttribute("href", "http://www.google.com")

    expect(linkButton).toHaveAttribute("target", "_blank")
  })

  it("should render the button with internal href using next/link", async () => {
    render(<Button text="Page Me" href={"page2"} />)
    const linkButton = screen.getByRole("link", { name: "Page Me" })
    expect(linkButton).toHaveAttribute("href", "page2")
    expect(linkButton).toHaveAttribute("data-testid", "next-link")
  })

  describe("styling", () => {
    it("should support all", () => {
      render(
        <Button text="Button Text" styling={{ small: true, inverted: true }} />
      )
      expect(screen.getByRole("button")).toHaveClass("container small invert")
    })

    it("should support only small", () => {
      render(
        <Button text="Button Text" styling={{ small: true, inverted: false }} />
      )
      expect(screen.getByRole("button")).toHaveClass("container small")
    })

    it("should support only inverted", () => {
      render(
        <Button text="Button Text" styling={{ small: false, inverted: true }} />
      )
      expect(screen.getByRole("button")).toHaveClass("container invert")
    })
  })
})
