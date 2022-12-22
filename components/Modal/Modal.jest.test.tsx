import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Modal from "."

describe("Modal", () => {
  const renderModal = ({
    isModal,
    onCancel = jest.fn(),
  }: {
    isModal: boolean
    onCancel?: (
      event?:
        | React.MouseEvent<HTMLElement, MouseEvent>
        | React.KeyboardEvent<HTMLElement>
    ) => void
  }) => {
    render(
      <Modal isModal={isModal} onCancel={onCancel}>
        <div>Nothing</div>
      </Modal>
    )
  }

  it("should render the model, button is focused and can be used to close", async () => {
    const onCancel = jest.fn()
    renderModal({ isModal: true, onCancel: onCancel })
    const button = screen.getByRole("button", { name: "[ESC]" })
    expect(button).toHaveFocus()
    await userEvent.click(button)
    expect(onCancel).toHaveBeenCalled()
  })

  //Behaviour cannot be tested until jsdom is fixed.
  xit("should render the model and can be closed by using esc keyboard", async () => {
    const onCancel = jest.fn()
    renderModal({ isModal: true, onCancel: onCancel })
    await userEvent.type(screen.getByRole("dialog"), "{esc}")
    expect(onCancel).toHaveBeenCalled()
  })

  //Behaviour cannot be tested until jsdom is fixed.
  xit("should render the model and can be closed by using Escape keyboard", async () => {
    const onCancel = jest.fn()
    renderModal({ isModal: true, onCancel: onCancel })
    await userEvent.type(screen.getByRole("dialog"), "{Escape}")
    expect(onCancel).toHaveBeenCalled()
  })

  //Behaviour cannot be tested until jsdom is fixed.
  xit("should render the model and can be closed by clicking anything outside", async () => {
    const onCancel = jest.fn()
    renderModal({ isModal: false, onCancel: onCancel })
    await userEvent.click(screen.getByRole("dialog"))
    expect(onCancel).toHaveBeenCalled()
  })

  it("should render the model and cannot be closed by clicking anything outside and only by button", async () => {
    const onCancel = jest.fn()
    renderModal({ isModal: true, onCancel: onCancel })
    await userEvent.click(screen.getByRole("dialog"))
    expect(onCancel).not.toHaveBeenCalled()
    await userEvent.click(screen.getByRole("button", { name: "[ESC]" }))
    expect(onCancel).toHaveBeenCalled()
  })
})
