import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Dialog from "."

describe("Dialog", () => {
  const renderModal = ({
    isNotModal = false,
    onCancel = jest.fn(),
  }: {
    isNotModal?: boolean
    onCancel?: (
      event?:
        | React.MouseEvent<HTMLElement, MouseEvent>
        | React.KeyboardEvent<HTMLElement>
    ) => void
  }) => {
    render(
      <Dialog isNotModal={isNotModal} onCancel={onCancel}>
        <div>Nothing</div>
      </Dialog>
    )
  }

  it("should render the model, button is focused and can be used to close", async () => {
    const onCancel = jest.fn()
    renderModal({ onCancel: onCancel })
    const button = screen.getByRole("button", { name: "[ESC]" })
    expect(button).toHaveAttribute("tabIndex", "0")
    await userEvent.click(button)
    expect(onCancel).toHaveBeenCalled()
  })

  it("should render the model and can be closed by using esc keyboard", async () => {
    const onCancel = jest.fn()
    renderModal({ onCancel: onCancel })
    await userEvent.type(screen.getByRole("dialog"), "{esc}")
    expect(onCancel).toHaveBeenCalled()
  })

  it("should render the model and can be closed by using Escape keyboard", async () => {
    const onCancel = jest.fn()
    renderModal({ onCancel: onCancel })
    await userEvent.type(screen.getByRole("dialog"), "{Escape}")
    expect(onCancel).toHaveBeenCalled()
  })

  it("should render the model and cannot be closed by clicking anything outside and only by button", async () => {
    const onCancel = jest.fn()
    renderModal({ onCancel: onCancel })
    await userEvent.click(screen.getByRole("dialog"))
    expect(onCancel).not.toHaveBeenCalled()
    await userEvent.click(screen.getByRole("button", { name: "[ESC]" }))
    expect(onCancel).toHaveBeenCalled()
  })
})
