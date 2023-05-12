/* eslint-disable testing-library/prefer-screen-queries */
import { test, expect, Page, chromium } from "@playwright/test"

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

  const startCall = async (userName: string) => {
    const browser = await chromium.launch({
      args: [
        "--use-fake-ui-for-media-stream",
        "--use-fake-device-for-media-stream",
      ],
    })

    const context = await browser.newContext({
      permissions: ["camera"],
    })

    const page = await context.newPage()
    await page.goto("/projects/webrtc")
    expect(await page.content()).toContain("Web RTC")
    await page.getByLabel("My user name:").fill(userName)
    await page.getByRole("button", { name: "Start" }).click()
    await page.waitForTimeout(1000)
    return page
  }

  test("should be able to start and end a call", async () => {
    const page = await startCall("Jeniffer")
    await page.getByRole("button", { name: "Stop" }).click()
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

  test("should be able to start 2 persons call, and receiver cancelled it", async () => {
    const caller = await startCall("Jessica Alba")
    const receiver = await startCall("Michelle Konikawa")

    await caller.getByRole("button", { name: "Call michelle konikawa" }).click()

    await receiver.waitForTimeout(2000)

    expect(await receiver.content()).toContain(
      "You have a call from (jessica alba). Would you like to answer?"
    )

    await receiver.getByRole("button", { name: "No" }).click()
    await caller.waitForTimeout(1000)

    expect(await caller.content()).toContain(
      "Call to michelle konikawa was politely declined."
    )
    await caller.getByRole("button", { name: "Ok" }).click()
    await caller.waitForTimeout(1000)

    await receiver.getByRole("button", { name: "Stop" }).click()
    await caller.getByRole("button", { name: "Stop" }).click()
  })

  test("should be able to start 2 persons call, and receiver answers it", async () => {
    const caller = await startCall("Jupiter")
    const receiver = await startCall("Mars")

    await caller.getByRole("button", { name: "Call mars" }).click()

    await receiver.waitForTimeout(2000)

    expect(await receiver.content()).toContain(
      "You have a call from (jupiter). Would you like to answer?"
    )

    await receiver.getByRole("button", { name: "Yes" }).click()
    await caller.waitForTimeout(1000)

    await receiver.getByRole("button", { name: "Stop" }).click()
    await caller.waitForTimeout(1000)

    expect(await caller.content()).toContain("User (mars) has left the chat.")

    await caller.getByRole("button", { name: "Ok" }).click()
    await caller.waitForTimeout(1000)

    expect(caller.getByRole("button", { name: "Start" })).toBeEnabled()
    expect(receiver.getByRole("button", { name: "Start" })).toBeEnabled()
  })

  /*
      await caller.screenshot({ path: "screenshot3.png", fullPage: true })
    await receiver.screenshot({ path: "screenshot4.png", fullPage: true })
  */
})
