/* eslint-disable testing-library/prefer-screen-queries */
import { test, expect } from "@playwright/test"
import { startCall } from "./call-util"

test.describe("Webrtc Chatter", () => {
  test("should have a callback url for pusher to authenticate", async ({
    request,
  }) => {
    const response = await request.get(`/api/pusherauth/ultraman`)
    expect(response.status()).toBe(405)
  })

  test("should be able to stop and restart", async () => {
    const receiver = await startCall("Billy")

    await receiver.getByRole("button", { name: "Stop" }).click({ force: true })

    await receiver.waitForTimeout(100)

    await receiver.getByRole("button", { name: "Start" }).click({ force: true })

    await receiver.waitForTimeout(100)

    await receiver.getByRole("button", { name: "Stop" }).click({ force: true })

    await receiver.close()
  })

  /*
      await caller.screenshot({ path: "screenshot3.png", fullPage: true })
    await receiver.screenshot({ path: "screenshot4.png", fullPage: true })
  */
})
