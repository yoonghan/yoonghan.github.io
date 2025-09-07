import { MessageType } from "@/components/Chat/config/MessageType"
import { MessageActionType, messageReducer } from "./useMessageReducer"

describe("useMessageReducer", () => {
  it("should handle default status", () => {
    const result = messageReducer([], {
      type: MessageActionType.Default,
      payload: {
        type: MessageType.CONNECTION,
        message: "message",
      },
    })
    expect(result).toStrictEqual([])
  })
})
