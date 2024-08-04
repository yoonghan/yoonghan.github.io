import { pusherAuthEndpoint } from "./config"

describe("Config", () => {
  it("should have the correct pusher endpoint", () => {
    expect(pusherAuthEndpoint).toBe("https://www.walcron.com/api/pusherauth")
  })
})
