import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import LetterBox from "."
import "../../__mocks__/windowMock"

describe("LetterBox", () => {
  it("should provide a letterbox render", () => {
    render(<LetterBox />)
    expect(
      screen.getByText(
        "If you are interested to talk to us, leave us your contact. Let us reach you instead."
      )
    ).toBeInTheDocument
  })

  it("should submit an email request and close", async () => {
    render(<LetterBox />)
    await userEvent.type(
      screen.getByPlaceholderText("Honorific and name"),
      "test@email.com"
    )

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument
    await userEvent.click(screen.getByRole("button", { name: "Write To Us" }))
    expect(screen.getByRole("dialog")).toBeInTheDocument

    expect(window.location.href).toContain(
      "mailto:walcoorperation@gmail.com?subject=Contact%20from%20test%40email.com%20website&body="
    )

    await userEvent.click(screen.getByRole("button", { name: "[ESC]" }))
  })

  it("should submit an email request with form submit", async () => {
    render(<LetterBox />)

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument
    await userEvent.type(
      screen.getByPlaceholderText("Honorific and name"),
      "test@email.com{enter}"
    )
    expect(screen.getByRole("dialog")).toBeInTheDocument
    await userEvent.click(screen.getByRole("button", { name: "[ESC]" }))
  })
})
