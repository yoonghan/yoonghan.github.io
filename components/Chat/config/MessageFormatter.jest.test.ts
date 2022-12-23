import { decodeMessage, encodeMessage } from "./MessageFormatter"
import { MessageType } from "./MessageType"

describe("MessageFormatter", () => {
  it("should be able to encode message correctly", () => {
    expect(encodeMessage("hi", MessageType.FILE)).toBe("F|hi")
    expect(encodeMessage("|HIsdf", MessageType.FILE)).toBe("F||HIsdf")
    expect(encodeMessage("this is a long message", MessageType.MESSAGE)).toBe(
      "M|this is a long message"
    )
  })

  it("should be able to decode message correctly", () => {
    expect(decodeMessage("F|hi")).toStrictEqual({
      messageType: MessageType.FILE,
      message: "hi",
    })
    expect(decodeMessage("M|this is a long message")).toStrictEqual({
      messageType: MessageType.MESSAGE,
      message: "this is a long message",
    })
  })
})
