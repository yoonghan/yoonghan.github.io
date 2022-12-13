import { test, expect } from "@playwright/test"

test.describe("important! urls", () => {
  test("should have a callback url for pusher to authenticate", async ({
    request,
  }) => {
    const response = await request.post(`/api/pusherauth`, {
      data: {
        socket_id: "ws",
      },
    })
    expect(response.status()).toBe(500)
  })
})
