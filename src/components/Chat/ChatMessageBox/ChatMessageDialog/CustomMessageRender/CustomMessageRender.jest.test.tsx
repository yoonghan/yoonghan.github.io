import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import CustomMessageRender from "."
import "@/__tests__/mocks/windowMock"

describe("CustomMessageRender", () => {
  it("should render the component message correctly", () => {
    render(<CustomMessageRender message={{ message: "Hello World" }} />)
    expect(screen.getByText("Hello World")).toBeInTheDocument()
  })

  it("should render complex message correctly", () => {
    render(
      <CustomMessageRender message={{ message: "T|I am a complex message" }} />
    )
    expect(screen.getByText("I am a complex message")).toBeInTheDocument()
  })

  it("should render message as a button link and when user click no it does nothing", async () => {
    const link = "http://www.firebase.com/storage/testfile"
    render(<CustomMessageRender message={{ message: `F|${link}` }} />)
    await userEvent.click(
      screen.getByRole("button", {
        name: "Open file ?",
      })
    )
    expect(
      await screen.findByText("Download Unverified File")
    ).toBeInTheDocument()

    await userEvent.click(
      screen.getByRole("button", {
        name: "No",
      })
    )
    expect(
      screen.queryByText("Download Unverified File")
    ).not.toBeInTheDocument()

    expect(
      screen.getByRole("button", {
        name: "Open file ?",
      })
    ).toBeInTheDocument()
  })

  it("should render message as a button link and when user click yes it redirects to new location", async () => {
    const link = "http://www.firebase.com/storage/testfile"
    render(<CustomMessageRender message={{ message: `F|${link}` }} />)
    await userEvent.click(
      screen.getByRole("button", {
        name: "Open file ?",
      })
    )
    expect(
      await screen.findByText("Download Unverified File")
    ).toBeInTheDocument()

    await userEvent.click(
      screen.getByRole("button", {
        name: "Yes",
      })
    )
    expect(
      screen.queryByText("Download Unverified File")
    ).not.toBeInTheDocument()

    expect(
      screen.queryByRole("button", {
        name: "Open file ?",
      })
    ).not.toBeInTheDocument()

    const downloadAnchor = screen.getByRole("link", { name: "[File Received]" })
    expect(downloadAnchor).toHaveAttribute("href", link)
    expect(downloadAnchor).toHaveAttribute("target", "_blank")
  })
})
