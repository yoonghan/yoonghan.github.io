import { render, screen, waitFor } from "@testing-library/react"
import { MessageHandler } from "./ChatMessageDialog"
import UserEvent from "@testing-library/user-event"
import { useRef } from "react"
import "../../../__mocks__/fetchMock"
import ChatMessageBox from "."

describe("ChatMessageBox", () => {
  const renderComponent = (onMessageSend = jest.fn()) =>
    render(<ChatMessageBox onMessageSend={onMessageSend} />)

  it("should render component correctly", async () => {
    renderComponent()
    expect(screen.getByText("Loading Chat Room")).toBeInTheDocument()
    expect(screen.getByLabelText("Message:")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Send" })).toBeInTheDocument()
    await waitFor(() => {
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

  it("should be able to upload a file, but fail to process", async () => {
    renderComponent(jest.fn())
    await UserEvent.upload(
      screen.getByTestId("file-uploader"),
      new File(["A file content."], "chucknorris.png", { type: "image/png" })
    )
    expect(
      screen.getByText("This file will be shared publicly. Are you sure?")
    ).toBeInTheDocument()
    await UserEvent.click(screen.getByRole("button", { name: "Yes" }))
    expect(
      await screen.findByText("Uploading file chucknorris.png...")
    ).toBeInTheDocument()
    expect(await screen.findByText("File upload failed")).toBeInTheDocument()
  })

  it("should be able to upload a file and successfully complete it", async () => {
    const messageSendFn = jest.fn()
    const uploadFilename = "jamesmillar.jpg"
    const serverFileName = "https://google.com/jamesmillar.jpg"
    ;(global.fetch as unknown as jest.Mock).mockResolvedValue({
      json: () => Promise.resolve({ status: "ok", data: serverFileName }),
    })
    renderComponent(messageSendFn)
    await UserEvent.upload(
      screen.getByTestId("file-uploader"),
      new File(["A file content."], uploadFilename, { type: "image/jpeg" })
    )
    expect(
      screen.getByText("This file will be shared publicly. Are you sure?")
    ).toBeInTheDocument()
    await UserEvent.click(screen.getByRole("button", { name: "Yes" }))
    expect(
      await screen.findByText("Uploading file jamesmillar.jpg...")
    ).toBeInTheDocument()
    expect(
      await screen.findByText(`Uploaded ${serverFileName}`)
    ).toBeInTheDocument()
    expect(messageSendFn).toBeCalledWith(`Uploaded ${serverFileName}`)
  })

  it("should be able to handle failed", async () => {
    const messageSendFn = jest.fn()
    const uploadFilename = "jamesmillar.jpg"
    ;(global.fetch as unknown as jest.Mock).mockRejectedValue("Server failed")
    renderComponent(messageSendFn)
    await UserEvent.upload(
      screen.getByTestId("file-uploader"),
      new File(["A file content."], uploadFilename, { type: "image/jpeg" })
    )
    expect(
      screen.getByText("This file will be shared publicly. Are you sure?")
    ).toBeInTheDocument()
    await UserEvent.click(screen.getByRole("button", { name: "Yes" }))
    expect(
      await screen.findByText("Uploading file jamesmillar.jpg...")
    ).toBeInTheDocument()
    expect(
      await screen.findByText(`File upload failed, (Server failed)`)
    ).toBeInTheDocument()
    expect(messageSendFn).not.toBeCalled()
  })

  it("should be able to handle file upload via button", async () => {
    const messageSendFn = jest.fn()
    const uploadFilename = "jamesmillar.jpg"
    ;(global.fetch as unknown as jest.Mock).mockRejectedValue("Server failed")
    renderComponent(messageSendFn)
    await UserEvent.click(screen.getByRole("button", { name: "Upload" }))
    await UserEvent.upload(
      screen.getByTestId("file-uploader"),
      new File(["A file content."], uploadFilename, { type: "image/jpeg" })
    )
    expect(
      screen.getByText("This file will be shared publicly. Are you sure?")
    ).toBeInTheDocument()
    await UserEvent.click(screen.getByRole("button", { name: "Yes" }))
    expect(
      await screen.findByText("Uploading file jamesmillar.jpg...")
    ).toBeInTheDocument()
    expect(
      await screen.findByText(`File upload failed, (Server failed)`)
    ).toBeInTheDocument()
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
