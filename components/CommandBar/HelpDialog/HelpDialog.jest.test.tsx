import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import HelpDialog from "."
import { AvailableInput } from "../CommandSearch/CommandSearch"

describe("HelpDialog", () => {
  it("should render help dialog correctly", () => {
    render(<HelpDialog onCancel={jest.fn()} specialInputCallback={jest.fn()} />)
    expect(screen.getByText("Help")).toBeInTheDocument()
  })

  it("should trigger cancel on close", async () => {
    const cancelFn = jest.fn()
    render(<HelpDialog onCancel={cancelFn} specialInputCallback={jest.fn()} />)

    await userEvent.click(screen.getByRole("button", { name: "×" }))
    expect(cancelFn).toHaveBeenCalled()
  })

  it("should trigger cancel and special command if one of the input was clicked", async () => {
    const cancelFn = jest.fn()
    const specialInputFn = jest.fn()
    render(
      <HelpDialog onCancel={cancelFn} specialInputCallback={specialInputFn} />
    )

    const oneOfTheInput = AvailableInput.pwd.description
    await userEvent.click(screen.getByText(oneOfTheInput))
    expect(cancelFn).toHaveBeenCalled()
    expect(specialInputFn).toHaveBeenCalled()
  })
})
