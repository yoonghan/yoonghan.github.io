import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import React from "react"
import CommandBarInput from "./CommandBarInput"

const Wrapper = ({
  children,
}: {
  children: (input: string, setInput: (input: string) => void) => JSX.Element
}) => {
  const [input, setInput] = React.useState("")
  return children(input, setInput)
}

describe("CommandBarInput", () => {
  const renderComponent = ({
    onSubmitCallback = jest.fn(),
    onBlurCallback = jest.fn(),
    onFocusCallback = jest.fn(),
  }: {
    onSubmitCallback?: (
      event: React.FormEvent<HTMLFormElement>,
      typedInput: string
    ) => {}
    onBlurCallback?: () => void
    onFocusCallback?: () => void
  }) => {
    return render(
      <Wrapper>
        {(input, setInput) => (
          <CommandBarInput
            suggestedInput={input}
            onSuggestedInputCallback={setInput}
            onBlurCallback={onBlurCallback}
            onFocusCallback={onFocusCallback}
            onSubmitCallback={onSubmitCallback}
          />
        )}
      </Wrapper>
    )
  }

  it("should be able to render correctly", () => {
    renderComponent({})
    expect(screen.getByText("walcron@tm$")).toBeInTheDocument()
  })

  it("should be able to suggest when user type 'he' only", async () => {
    renderComponent({})
    const input = screen.getByRole("textbox")
    await userEvent.type(input, "he")
    expect(input).toHaveValue("he")
    expect(await screen.findByText("help")).toBeInTheDocument()
    await userEvent.type(input, "{backspace}{backspace}j")
    expect(screen.queryByText("help")).not.toBeInTheDocument()
  })

  it("should be able to choose and submit suggestedInput", async () => {
    const submitFn = jest.fn((e) => e.preventDefault())
    renderComponent({ onSubmitCallback: submitFn })
    await userEvent.type(screen.getByRole("textbox"), "he")
    await userEvent.click(screen.getByText("help"))
    await userEvent.type(screen.getByRole("textbox"), "{enter}")
    expect(submitFn).toHaveBeenCalled()
  })

  it("should be able to choose and submit by button", async () => {
    const submitFn = jest.fn((e) => e.preventDefault())
    renderComponent({ onSubmitCallback: submitFn })
    await userEvent.type(screen.getByRole("textbox"), "help")
    await userEvent.click(screen.getByRole("button", { name: "Enter" }))
    expect(submitFn).toHaveBeenCalled()
  })

  it("should allow only 22 max characters", async () => {
    renderComponent({})
    const input = screen.getByRole("textbox")
    await userEvent.type(input, "h".repeat(24))
    expect(screen.getByRole("textbox")).toHaveValue("h".repeat(22))
  })

  it("should show prompt when focus", () => {
    const blurCallback = jest.fn()
    const focusCallback = jest.fn()
    renderComponent({
      onBlurCallback: blurCallback,
      onFocusCallback: focusCallback,
    })
    const input = screen.getByRole("textbox")
    fireEvent.focus(input)
    expect(focusCallback).toHaveBeenCalled()
    expect(screen.getByTestId("prompter")).toBeInTheDocument()
    fireEvent.blur(input)
    expect(blurCallback).toHaveBeenCalled()
    expect(screen.queryByTestId("prompter")).not.toBeInTheDocument()
  })
})