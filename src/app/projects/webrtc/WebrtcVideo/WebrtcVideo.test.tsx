import { presencePusherApiUrl } from "."

describe("WebrtcVideo", () => {
  it("should contain correct pusher api url", () => {
    expect(presencePusherApiUrl).toBe("/api/pusherauth")
  })
})
