import { render, screen } from "@testing-library/react"
import EmailSender from "./EmailSender"
import "../../__mocks__/windowMock"

describe("EmailSender", () => {
  it("should render email messagebox", () => {
    render(<EmailSender writeFrom="Recipient" writeTo="Sender" />)
    expect(
      screen.getByText(
        "Apologies that we do require you to use your own mailbox"
      )
    ).toBeInTheDocument()
  })

  it("should create an HTML email", () => {
    const expectedBody = "Hello there, "
    const sender = "Sender"
    render(<EmailSender writeFrom="Enc0&dRecX" writeTo={sender} />)
    expect(window.location.href).toBe(
      `mailto:${sender}?subject=Contact%20from%20Enc0%26dRecX%20website&body=${expectedBody}`
    )
  })
})
