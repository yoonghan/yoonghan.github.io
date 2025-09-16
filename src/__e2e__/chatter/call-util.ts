/* eslint-disable no-console */

/* eslint-disable testing-library/prefer-screen-queries */

import { chromium, expect, Page } from "@playwright/test"

export const startCall = async (userName: string) => {
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
  await page.waitForTimeout(1000) //wait for camera to appear]
  return page
}

export const callAnotherPerson = async (
  caller: Page,
  receiver: Page,
  callerName: string,
  receiverName: string,
) => {
  for (
    let count = 0;
    count < 2 &&
    (await caller.$(`button:text("Call ${receiverName}")`)) === null;
    count++
  ) {
    console.log("bump a restart as call button is not found")
    //Fix bug that sometimes pusher don't add into the list
    await receiver.getByRole("button", { name: "Stop" }).click({ force: true })
    await receiver.waitForTimeout(1000)
    await receiver.getByRole("button", { name: "Start" }).click({ force: true })
    await receiver.waitForTimeout(2000)
  }
  await caller
    .getByRole("button", { name: `Call ${receiverName}` })
    .click({ force: true })
  await receiver.waitForTimeout(3000)
  expect(await receiver.content()).toContain(
    `You have a call from (${callerName}). Would you like to answer?`,
  )
}
