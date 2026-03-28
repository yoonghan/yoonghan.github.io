import { render, screen, fireEvent } from "@testing-library/react"
import ChatMessageBox from "./index"
import "@/__tests__/mocks/fetchMock"

let capturedOnDrop: (files: File[]) => void

jest.mock("react-dropzone", () => ({
  useDropzone: (options: any) => {
    capturedOnDrop = options.onDrop
    return {
      getRootProps: () => ({}),
      getInputProps: () => ({}),
      inputRef: { current: null },
    }
  },
}))

describe("ChatMessageBox - null ref coverage", () => {
  it("should handle null inputRef safely when upload button is clicked (line 159)", () => {
    render(<ChatMessageBox onMessageSend={jest.fn()} />)
    const uploadBtn = screen.getByRole("button", { name: "Upload" })

    expect(() => fireEvent.click(uploadBtn)).not.toThrow()
  })

  it("should handle null inputRef safely when onDrop is triggered (line 88)", () => {
    render(<ChatMessageBox onMessageSend={jest.fn()} />)

    const mockFile = new File(["test"], "test.png", { type: "image/png" })
    expect(() => capturedOnDrop([mockFile])).not.toThrow()
  })
})
