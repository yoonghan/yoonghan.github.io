/*
 Do not split test, pusher has issue if not disconnected, next start would not find proper users.
*/

/* eslint-disable testing-library/prefer-screen-queries */
import { test, expect } from "@playwright/test"
import { callAnotherPerson, startCall } from "./call-util"

test.describe("Webrtc calls", () => {
  test("should be able to start 2 persons call, and receiver rejects it", async () => {
    const caller = await startCall("Jessica")
    const receiver = await startCall("Michelle")

    await callAnotherPerson(caller, receiver, "Jessica", "Michelle")

    await receiver.getByRole("button", { name: "No" }).click({ force: true })
    await caller.waitForTimeout(1000)

    expect(await caller.content()).toContain(
      "Call to (Michelle) was politely declined."
    )
    await caller.getByRole("button", { name: "Ok" }).click({ force: true })
    await caller.waitForTimeout(1000)

    await receiver.getByRole("button", { name: "Stop" }).click({ force: true })
    await caller.getByRole("button", { name: "Stop" }).click({ force: true })

    await caller.close()
    await receiver.close()
  })

  test("should be able to start 2 persons call, and receiver answers it", async () => {
    const caller = await startCall("Jupiter")
    const receiver = await startCall("Mars")

    await callAnotherPerson(caller, receiver, "Jupiter", "Mars")

    await receiver.getByRole("button", { name: "Yes" }).click({ force: true })
    await caller.waitForTimeout(1000)

    await caller.getByRole("button", { name: "Stop" }).click({ force: true })
    await caller.waitForTimeout(1000)

    expect(await receiver.content()).toContain(
      "User (Jupiter) has left the chat."
    )

    await receiver.getByRole("button", { name: "Ok" }).click({ force: true })
    await receiver.waitForTimeout(1000)

    await caller.close()
    await receiver.close()
  })

  /*
      await caller.screenshot({ path: "screenshot3.png", fullPage: true })
    await receiver.screenshot({ path: "screenshot4.png", fullPage: true })
  */
})
