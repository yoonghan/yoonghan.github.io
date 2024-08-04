import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import "@/__tests__/mocks/routerMock"
import NoSSRCommandBar from "./NoSSRCommandBar"

describe("NoSSRCommandBar", () => {
  it("should render command input", () => {
    render(<NoSSRCommandBar />)
    expect(screen.getByText("walcron@tm$")).toBeInTheDocument()
  })

  it("should allow me to do a help and cancel", async () => {
    render(<NoSSRCommandBar />)
    await userEvent.type(screen.getByRole("combobox"), "help{enter}")
    expect(screen.getByText("Help")).toBeInTheDocument()
    await userEvent.click(screen.getByRole("button", { name: "[ESC]" }))
  })
})
