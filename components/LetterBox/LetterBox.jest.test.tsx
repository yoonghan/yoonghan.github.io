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

    expect(screen.queryByRole("modal")).not.toBeInTheDocument
    await userEvent.click(screen.getByRole("button"))
    expect(screen.getByRole("modal")).toBeInTheDocument

    expect(window.location.href).toContain(
      "mailto:walcoorperation@gmail.com?subject=Contact%20from%20test%40email.com%20website&body="
    )

    await userEvent.click(screen.getByRole("button", { name: "[ESC]" }))
  })

  it("should  not to submit an email if no name is entered", async () => {
    render(<LetterBox />)

    await userEvent.click(screen.getByRole("button"))
    expect(screen.queryByRole("modal")).not.toBeInTheDocument
  })
})
