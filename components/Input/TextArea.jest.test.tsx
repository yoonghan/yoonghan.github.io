import { render, screen } from "@testing-library/react"
import UserEvent from "@testing-library/user-event"
import TextArea from "./TextArea"
import { ChangeEvent } from "react"

describe("TextArea", () => {
  const renderComponent = (
    value = "",
    onChange = jest.fn(),
    onSubmit = jest.fn()
  ) =>
    render(<TextArea onSubmit={onSubmit} value={value} onChange={onChange} />)

  it("should display the correct value inserted", () => {
    renderComponent("Hello")
    expect(screen.getByRole("textbox")).toHaveValue("Hello")
  })

  it("should trigger onChange for text typed", async () => {
    const onChangeFn = jest.fn()
    renderComponent("", onChangeFn)
    await UserEvent.type(screen.getByRole("textbox"), "a")
    expect(onChangeFn).toHaveBeenCalled()
  })

  it("should submit when enter is keyed in", async () => {
    const onChangeFn = jest.fn()
    const onSubmitFn = jest.fn()
    renderComponent("", onChangeFn, onSubmitFn)
    await UserEvent.type(screen.getByRole("textbox"), "Hi {enter}")
    expect(onSubmitFn).toHaveBeenCalled()
  })

  it("should not trigger submit, but on change if shift+enter is keyed in", async () => {
    let hasNewLine = false
    const onChangeFn = jest.fn()
    onChangeFn.mockImplementation((event: ChangeEvent<HTMLTextAreaElement>) => {
      // eslint-disable-next-line no-console
      if (event.target.value === "\r\n") {
        hasNewLine = true
      }
    })
    const onSubmitFn = jest.fn()
    renderComponent("", onChangeFn, onSubmitFn)
    await UserEvent.type(
      screen.getByRole("textbox"),
      "Hello{Shift>}{enter}{/Shift}World"
    )
    expect(onChangeFn).toHaveBeenCalled()
    expect(onSubmitFn).not.toHaveBeenCalled()
    expect(hasNewLine).toBeTruthy()
  })
})
