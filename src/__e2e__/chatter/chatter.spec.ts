/* eslint-disable no-console */
/* eslint-disable testing-library/prefer-screen-queries */

/*
 Do not split test.
 Due to be using vercel preview, many instabilities happen over here.
*/

import { test, expect } from "@playwright/test"
import { callAnotherPerson, startCall } from "./call-util"

test.describe("Webrtc config", () => {
  test("should have a callback url for pusher to authenticate", async ({
    request,
  }) => {
    const response = await request.get(`/api/pusherauth/ultraman`)
    expect(response.status()).toBe(405)
  })

  // test("should be able to stop and restart", async () => {
  //   const receiver = await startCall("Billy")

  //   await receiver
  //     .getByRole("button", { name: "Stop" })
  //     .click({ force: true, delay: 1000 })

  //   await receiver
  //     .getByRole("button", { name: "Start" })
  //     .click({ force: true, delay: 1000 })
  //   await receiver.waitForTimeout(1000) //wait for camera to appear

  //   await receiver
  //     .getByRole("button", { name: "Stop" })
  //     .click({ force: true, delay: 1000 })

  //   await receiver.close()
  // })
})

test.describe("Webrtc calls", () => {
  // test("should be able to start 2 persons call, and receiver rejects it", async () => {
  //   const caller = await startCall("Jessica")
  //   const receiver = await startCall("Michelle")

  //   await callAnotherPerson(caller, receiver, "Jessica", "Michelle")
  //   console.log("Reject call")

  //   await receiver.getByRole("button", { name: "No" }).click({ force: true })
  //   await caller.waitForTimeout(1000)

  //   expect(await caller.content()).toContain(
  //     "Call to (Michelle) was politely declined."
  //   )
  //   console.log("Reject decline")

  //   await caller.getByRole("button", { name: "Ok" }).click({ force: true })
  //   await caller.waitForTimeout(1000)

  //   await receiver.getByRole("button", { name: "Stop" }).click({ force: true })
  //   await caller.getByRole("button", { name: "Stop" }).click({ force: true })

  //   console.log("Reject done")
  //   await caller.close()
  //   await receiver.close()
  // })

  test("should be able to start 2 persons call, and receiver answers it", async () => {
    const caller = await startCall("Jupiter")
    const receiver = await startCall("Mars")
    console.log("Accept startup")

    await callAnotherPerson(caller, receiver, "Jupiter", "Mars")
    console.log("Accept call")

    await receiver.getByRole("button", { name: "Yes" }).click({ force: true })
    await caller.waitForTimeout(1000)
    console.log("Accept confirm")

    await caller.getByRole("button", { name: "Stop" }).click({ force: true })
    await caller.waitForTimeout(1000)
    console.log("Accept decline")

    expect(await receiver.content()).toContain(
      "User (Jupiter) has left the chat."
    )

    await receiver.getByRole("button", { name: "Ok" }).click({ force: true })
    await receiver.waitForTimeout(1000)
    console.log("Accept done")

    await caller.close()
    await receiver.close()
  })

  /*
      await caller.screenshot({ path: "screenshot3.png", fullPage: true })
    await receiver.screenshot({ path: "screenshot4.png", fullPage: true })
  */
})
