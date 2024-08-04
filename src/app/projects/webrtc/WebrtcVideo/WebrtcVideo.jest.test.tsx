import { presencePusherApiUrl } from "."

describe("WebrtcVideo", () => {
  it("should contain correct pusher api url", () => {
    expect(presencePusherApiUrl).toBe("https://www.walcron.com/api/pusherauth")
  })
})
