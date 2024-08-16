/* eslint-disable testing-library/prefer-screen-queries */
import { test, expect } from "@playwright/test"
import { callAnotherPerson, startCall } from "./call-util"

test.describe("Webrtc answer", () => {
  test("should be able to start 2 persons call, and receiver answers it", async () => {
    const caller = await startCall("Jupiter")
    const receiver = await startCall("Mars")

    await callAnotherPerson(caller, receiver, "Jupiter", "Mars")

    await receiver.getByRole("button", { name: "Yes" }).click()
    await caller.waitForTimeout(1000)

    await caller.getByRole("button", { name: "Stop" }).click()
    await caller.waitForTimeout(1000)

    expect(await receiver.content()).toContain(
      "User (Jupiter) has left the chat."
    )

    await receiver.getByRole("button", { name: "Ok" }).click()
    await receiver.waitForTimeout(1000)

    expect(caller.getByRole("button", { name: "Start" })).toBeEnabled()
    expect(receiver.getByRole("button", { name: "Start" })).toBeEnabled()
  })

  /*
      await caller.screenshot({ path: "screenshot3.png", fullPage: true })
    await receiver.screenshot({ path: "screenshot4.png", fullPage: true })
  */
})
