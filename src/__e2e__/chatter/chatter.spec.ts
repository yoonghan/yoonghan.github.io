/* eslint-disable testing-library/prefer-screen-queries */
import { test, expect, Page, chromium } from "@playwright/test"
import { startCall } from "./call-util"

test.describe("Webrtc", () => {
  test("should have a callback url for pusher to authenticate", async ({
    request,
  }) => {
    const response = await request.get(`/api/pusherauth/ultraman`)
    expect(response.status()).toBe(405)
    expect(await response.json()).toStrictEqual({
      error: "Method GET not recognized.",
    })
  })

  test("should be able to stop and restart", async () => {
    const caller = await startCall("John Carner")
    const receiver = await startCall("Billy")

    await receiver.getByRole("button", { name: "Stop" }).click()
    await caller.getByRole("button", { name: "Stop" }).click()

    await receiver.waitForTimeout(1000)

    await receiver.getByRole("button", { name: "Start" }).click()
    await caller.getByRole("button", { name: "Start" }).click()

    await receiver.waitForTimeout(1000)

    expect(caller.getByRole("button", { name: "Stop" })).toBeEnabled()
    expect(receiver.getByRole("button", { name: "Stop" })).toBeEnabled()
  })

  /*
      await caller.screenshot({ path: "screenshot3.png", fullPage: true })
    await receiver.screenshot({ path: "screenshot4.png", fullPage: true })
  */
})
