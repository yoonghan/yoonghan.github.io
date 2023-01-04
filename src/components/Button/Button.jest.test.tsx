import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Button from "."

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
    render(<Button>Button Text</Button>)
    expect(screen.getByRole("button")).toHaveTextContent("Button Text")
  })

  it("should render the button which is clickable", async () => {
    const clickFn = jest.fn()
    render(<Button onClick={clickFn}>Click Me</Button>)
    await userEvent.click(screen.getByRole("button", { name: "Click Me" }))
    expect(clickFn).toHaveBeenCalled()
  })

  it("should be able to add additional props for button", async () => {
    const clickFn = jest.fn()
    render(
      <Button onClick={clickFn} additionalProps={{ type: "submit" }}>
        Click Me
      </Button>
    )
    const button = screen.getByRole("button", { name: "Click Me" })
    await userEvent.click(button)
    expect(button).toHaveAttribute("type", "submit")
    expect(clickFn).toHaveBeenCalled()
  })

  it("should render the button with external href", async () => {
    render(<Button href={"http://www.google.com"}>Link Me</Button>)
    const linkButton = screen.getByRole("link", { name: "Link Me" })
    expect(linkButton).toHaveAttribute("href", "http://www.google.com")

    expect(linkButton).toHaveAttribute("target", "_self")
    expect(linkButton).toHaveAttribute("rel", "external")
  })

  it("should render the button with external href with target", async () => {
    render(
      <Button href={"http://www.google.com"} target={"_blank"}>
        Link Me
      </Button>
    )
    const linkButton = screen.getByRole("link", { name: "Link Me" })
    expect(linkButton).toHaveAttribute("href", "http://www.google.com")

    expect(linkButton).toHaveAttribute("target", "_blank")
  })

  it("should render the button with internal href using next/link", async () => {
    render(<Button href={"page2"}>Page Me</Button>)
    const linkButton = screen.getByRole("link", { name: "Page Me" })
    expect(linkButton).toHaveAttribute("href", "page2")
    expect(linkButton).toHaveAttribute("data-testid", "next-link")
  })

  describe("styling", () => {
    it("should support all", () => {
      render(
        <Button styling={{ small: true, inverted: true }}>Button Text</Button>
      )
      expect(screen.getByRole("button")).toHaveClass("container small invert")
    })

    it("should support only small", () => {
      render(
        <Button styling={{ small: true, inverted: false }}>Button Text</Button>
      )
      expect(screen.getByRole("button")).toHaveClass("container small")
    })

    it("should support only inverted", () => {
      render(
        <Button styling={{ small: false, inverted: true }}>Button Text</Button>
      )
      expect(screen.getByRole("button")).toHaveClass("container invert")
    })

    it("should support color change", () => {
      const view = render(<Button color={"orange"}>Button Text</Button>)
      expect(screen.getByRole("button")).toHaveClass("container orange")
      view.rerender(<Button color={"white"}>Button Text</Button>)
      expect(screen.getByRole("button")).toHaveClass("container white")
    })
  })
})
