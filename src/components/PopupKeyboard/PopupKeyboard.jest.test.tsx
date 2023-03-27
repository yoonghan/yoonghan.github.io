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
})
