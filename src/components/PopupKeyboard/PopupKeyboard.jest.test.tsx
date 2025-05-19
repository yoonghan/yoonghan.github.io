import { render, screen, waitFor } from "@testing-library/react"
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

  const assertKeyBoardAction =
    (clickCallback: () => void) => async (action: KeyboardKeys) => {
      await waitFor(() => {
        expect(clickCallback).toHaveBeenCalledWith(action)
      })
    }

  it("should enable keyboard listener", async () => {
    const clickCallback = jest.fn()
    render(
      <PopupKeyboard
        buttonText={"Interactive Keyboard"}
        keyboardType={"Arrows"}
        onClickCallback={clickCallback}
        enableKeyboardListener={true}
      />
    )
    const assertClickAction = assertKeyBoardAction(clickCallback)

    await userEvent.keyboard(`{${KeyboardKeys.UP}}`)
    await assertClickAction(KeyboardKeys.UP)

    await userEvent.keyboard(`{${KeyboardKeys.DOWN}}`)
    await assertClickAction(KeyboardKeys.DOWN)

    await userEvent.keyboard(`{${KeyboardKeys.LEFT}}`)
    await assertClickAction(KeyboardKeys.LEFT)

    await userEvent.keyboard(`{${KeyboardKeys.RIGHT}}`)
    await assertClickAction(KeyboardKeys.RIGHT)
  })

  it("should restore keyboard enabled listener on component unmount", async () => {
    const clickCallback = jest.fn()
    const { unmount } = render(
      <PopupKeyboard
        buttonText={"Interactive Keyboard"}
        keyboardType={"Arrows"}
        onClickCallback={clickCallback}
        enableKeyboardListener={true}
      />
    )

    const assertClickAction = assertKeyBoardAction(clickCallback)
    await userEvent.keyboard(`{${KeyboardKeys.UP}}`)
    await assertClickAction(KeyboardKeys.UP)

    unmount()

    await userEvent.keyboard(`{${KeyboardKeys.UP}}`)
    await waitFor(
      () => {
        expect(clickCallback).toHaveBeenCalledTimes(1)
      },
      { interval: 200 } //wait for queue to complete
    )
  })
})
