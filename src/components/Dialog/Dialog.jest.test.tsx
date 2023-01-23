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
        <div data-testid="child-in-dialog">Nothing</div>
      </Dialog>
    )
  }

  it("should render the model, button is focused and can be used to close", async () => {
    const onCancel = jest.fn()
    renderModal({ onCancel: onCancel })
    expect(screen.getByRole("dialog")).toBeInTheDocument()
    const button = screen.getByRole("button", { name: "[ESC]" })
    await userEvent.click(button)
    expect(onCancel).toHaveBeenCalled()
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
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

  it("should render the model will close and will close when outer dialog is click", async () => {
    const onCancel = jest.fn()
    renderModal({ onCancel: onCancel })
    await userEvent.click(screen.getByRole("dialog"))
    expect(onCancel).toHaveBeenCalled()
  })

  it("should render the model will close will not close when the child DIV is clicked", async () => {
    const onCancel = jest.fn()
    renderModal({ onCancel: onCancel })
    await userEvent.click(screen.getByTestId("child-in-dialog"))
    expect(onCancel).not.toHaveBeenCalled()
  })

  it("should render non modal, it cannot be closed by clicking anything outside and only by button", async () => {
    const onCancel = jest.fn()
    renderModal({ isNotModal: true, onCancel: onCancel })
    await userEvent.click(screen.getByRole("dialog"))
    expect(onCancel).not.toHaveBeenCalled()
    await userEvent.click(screen.getByRole("button", { name: "×" }))
    expect(onCancel).toHaveBeenCalled()
  })

  it("should remove dialog completely", async () => {
    const onCancel = jest.fn()
    renderModal({ onCancel: onCancel })
    expect(screen.getByText("Nothing")).toBeInTheDocument()
    expect(screen.getByRole("dialog")).toBeInTheDocument()
    await userEvent.click(screen.getByRole("button", { name: "[ESC]" }))
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
    expect(screen.queryByText("Nothing")).not.toBeInTheDocument()
  })
})
