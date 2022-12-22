import { render, screen, act } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import NoSSRCommandBar from "./NoSSRCommandBar"

describe("NoSSRCommandBar", () => {
  it("should render command input", () => {
    render(<NoSSRCommandBar />)
    expect(screen.getByText("walcron@tm$")).toBeInTheDocument()
  })

  it("should allow me to do a help and cancel", async () => {
    render(<NoSSRCommandBar />)
    const input = screen.getByRole("textbox")
    await userEvent.type(screen.getByRole("textbox"), "help")
    await userEvent.click(screen.getByRole("button", { name: "Enter" }))
    expect(screen.getByText("Help")).toBeInTheDocument()
    expect(screen.queryByTestId("prompter")).not.toBeInTheDocument()
    await userEvent.click(screen.getByRole("button", { name: "×" }))
  })
})
