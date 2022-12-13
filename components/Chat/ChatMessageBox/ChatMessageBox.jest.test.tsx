import { render, screen, waitFor } from "@testing-library/react"
import ChatMessageBox from "."
import { MessageHandler } from "./ChatMessageDialog"
import UserEvent from "@testing-library/user-event"
import { useRef } from "react"

describe("ChatMessageBox", () => {
  const renderComponent = (onMessageSend = jest.fn()) =>
    render(<ChatMessageBox onMessageSend={onMessageSend} />)

  it("should render component correctly", () => {
    renderComponent()
    expect(screen.getByText("Loading Chat Room")).toBeInTheDocument()
    expect(screen.getByLabelText("Message:")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Send" })).toBeInTheDocument()
    waitFor(() => {
      expect(screen.queryByText("Loading Chat Room")).not.toBeInTheDocument()
    })
  })

  it("should be able to send message and dialog displays the message", async () => {
    const messageSendFn = jest.fn()
    renderComponent(messageSendFn)
    await UserEvent.type(
      screen.getByPlaceholderText("Your Message"),
      "sample message"
    )
    await UserEvent.click(screen.getByRole("button", { name: "Send" }))

    expect(screen.getByLabelText("Message:")).toHaveValue("")
    expect(screen.getByText("sample message")).toBeInTheDocument()
  })

  it("should not send message, if message input is blank", async () => {
    const messageSendFn = jest.fn()
    renderComponent(messageSendFn)
    await UserEvent.click(screen.getByRole("button", { name: "Send" }))

    expect(messageSendFn).not.toBeCalled()
  })

  describe("integration", () => {
    const IntegratedComponent = () => {
      const refComponent = useRef<MessageHandler>(null)

      const addCustomMessage = () => {
        if (refComponent.current !== null) {
          refComponent.current.addMessage(undefined, "Custom Message")
        }
      }

      return (
        <>
          <button onClick={addCustomMessage}>Custom Buttom</button>
          <ChatMessageBox onMessageSend={jest.fn()} ref={refComponent} />
        </>
      )
    }

    const renderIntegratedComponent = () => render(<IntegratedComponent />)

    it("should be able to add message to the dialog", async () => {
      renderIntegratedComponent()

      await UserEvent.click(
        screen.getByRole("button", { name: "Custom Buttom" })
      )

      expect(screen.getByText("Custom Message")).toBeInTheDocument()
    })
  })
})
