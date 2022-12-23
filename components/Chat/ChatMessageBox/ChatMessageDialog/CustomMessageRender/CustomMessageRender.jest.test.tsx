import { render, screen } from "@testing-library/react"
import CustomMessageRender from "."

describe("CustomMessageRender", () => {
  it("should render the component message correctly", () => {
    render(<CustomMessageRender message={{ message: "Hello World" }} />)
    expect(screen.getByText("Hello World")).toBeInTheDocument()
  })

  it("should render message as a html link", () => {
    const link = "http://www.firebase.com/storage/testfile"
    render(<CustomMessageRender message={{ message: link }} />)
    const messageField = screen.getByRole("link", {
      name: "[File Received]",
    })
    expect(messageField).toHaveAttribute("href", link)
    expect(messageField).toHaveAttribute("target", "_blank")
  })
})
