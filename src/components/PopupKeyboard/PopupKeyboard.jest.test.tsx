import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import PopupKeyboard, { KeyboardKeys } from "."

describe("PopupKeyboard", () => {
  it("should render a button and show arrows", async () => {
    const clickCallback = jest.fn()
    render(
      <PopupKeyboard
        buttonText={"Interactive Keyboard"}
        keyboardType={"Arrows"}
        onClickCallback={clickCallback}
      />
    )

    await userEvent.click(screen.getByText("Interactive Keyboard"))

    await userEvent.click(screen.getByText("↑"))
    expect(clickCallback).toHaveBeenCalledWith(KeyboardKeys.UP)

    await userEvent.click(screen.getByText("↓"))
    expect(clickCallback).toHaveBeenCalledWith(KeyboardKeys.DOWN)

    await userEvent.click(screen.getByText("←"))
    expect(clickCallback).toHaveBeenCalledWith(KeyboardKeys.LEFT)

    await userEvent.click(screen.getByText("→"))
    expect(clickCallback).toHaveBeenCalledWith(KeyboardKeys.RIGHT)
  })

  it("should hide/show keyboard", async () => {
    const clickCallback = jest.fn()
    render(
      <div data-testid="outside-wrapper">
        <PopupKeyboard
          buttonText={"Interactive Keyboard"}
          keyboardType={"Arrows"}
          onClickCallback={clickCallback}
        />
      </div>
    )

    const upButton = "↑"

    await userEvent.click(screen.getByText("Interactive Keyboard"))
    expect(screen.getByText(upButton)).toBeInTheDocument()
    await userEvent.click(screen.getByTestId("outside-wrapper"))
    expect(screen.getByText(upButton)).toBeInTheDocument()
    await userEvent.click(screen.getByText("Interactive Keyboard"))
    expect(screen.queryByText(upButton)).not.toBeInTheDocument()
  })

  it("should enable keyboard listener", () => {
    const clickCallback = jest.fn()
    render(
      <PopupKeyboard
        buttonText={"Interactive Keyboard"}
        keyboardType={"Arrows"}
        onClickCallback={clickCallback}
        enableKeyboardListener={true}
      />
    )
    userEvent.keyboard(`{${KeyboardKeys.UP}}`)
    expect(clickCallback).toHaveBeenCalledWith(KeyboardKeys.UP)

    userEvent.keyboard(`{${KeyboardKeys.DOWN}}`)
    expect(clickCallback).toHaveBeenCalledWith(KeyboardKeys.DOWN)

    userEvent.keyboard(`{${KeyboardKeys.LEFT}}`)
    expect(clickCallback).toHaveBeenCalledWith(KeyboardKeys.LEFT)

    userEvent.keyboard(`{${KeyboardKeys.RIGHT}}`)
    expect(clickCallback).toHaveBeenCalledWith(KeyboardKeys.RIGHT)
  })

  it("should restore keyboard enabled listener on component unmount", () => {
    const clickCallback = jest.fn()
    const { unmount } = render(
      <PopupKeyboard
        buttonText={"Interactive Keyboard"}
        keyboardType={"Arrows"}
        onClickCallback={clickCallback}
        enableKeyboardListener={true}
      />
    )
    userEvent.keyboard(`{${KeyboardKeys.UP}}`)
    expect(clickCallback).toHaveBeenCalledWith(KeyboardKeys.UP)

    unmount()

    userEvent.keyboard(`{${KeyboardKeys.UP}}`)
    expect(clickCallback).toHaveBeenCalledTimes(1)
  })
})
