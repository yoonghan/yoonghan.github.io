/* eslint-disable testing-library/prefer-screen-queries */
import { test, expect, Page, chromium } from "@playwright/test"
import { callAnotherPerson, startCall } from "./call-util"

test.describe("Webrtc", () => {
  test("should be able to start 2 persons call, and receiver rejects it", async () => {
    const caller = await startCall("Jessica")
    const receiver = await startCall("Michelle")

    await callAnotherPerson(caller, receiver, "Jessica", "Michelle")

    await receiver.getByRole("button", { name: "No" }).click()
    await caller.waitForTimeout(1000)

    expect(await caller.content()).toContain(
      "Call to (Michelle) was politely declined."
    )
    await caller.getByRole("button", { name: "Ok" }).click()
    await caller.waitForTimeout(1000)

    await receiver.getByRole("button", { name: "Stop" }).click()
    await caller.getByRole("button", { name: "Stop" }).click()
  })

  /*
      await caller.screenshot({ path: "screenshot3.png", fullPage: true })
    await receiver.screenshot({ path: "screenshot4.png", fullPage: true })
  */
})
