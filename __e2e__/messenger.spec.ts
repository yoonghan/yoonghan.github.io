/* eslint-disable testing-library/prefer-screen-queries */
import { test, expect } from "@playwright/test"

test.describe("Messenger", () => {
  test("should have a callback url for pusher to authenticate", async ({
    request,
  }) => {
    const response = await request.get(`/api/pusherauth`)
    expect(response.status()).toBe(405)
    expect(await response.json()).toStrictEqual({
      error: "Method GET not recognized.",
    })
  })

  test("should have a callback url for firebase", async ({ request }) => {
    const response = await request.get(`/api/firebase`)
    expect(response.status()).toBe(405)
    expect(await response.json()).toStrictEqual({
      error: "Method GET not recognized.",
    })
  })

  test("should be able to visit chat page", async ({ page }) => {
    await page.goto("/projects/messenger")
    expect(await page.content()).toContain("A Walcron Chat Program")
    expect(await page.content()).not.toContain("Hello World")
    await page.getByPlaceholder("Your Message").fill("Hello World")
    await page.getByRole("button", { name: "Send" }).click({ delay: 3000 })
    await page.waitForSelector(".react-bell-chat__chat-bubble")
    expect(
      page
        .locator(".react-bell-chat__chat-scroll-area")
        .getByText("Hello World")
    ).toBeDefined()
  })

  // test("should show a pop up to indicate file upload", async ({ page }) => {
  //   await page.goto("/projects/messenger")
  //   expect(await page.content()).toContain("A Walcron Chat Program")
  //   await page.setInputFiles('input[type="file"]', "__e2e__/upload/sample.txt")
  //   expect(await page.content()).toContain(
  //     "This file will be shared publicly. Are you sure?"
  //   )
  //   await page.getByRole("button", { name: "No" }).click()
  //   //no possible way to test this unfortunately.
  //   //await page.click("#file-upload-btn")
  // })

  // test("should show a pop up again if reuploaded after no/yes is click", async ({
  //   page,
  // }) => {
  //   await page.goto("/projects/messenger")
  //   expect(await page.content()).toContain("A Walcron Chat Program")
  //   await page.setInputFiles('input[type="file"]', "__e2e__/upload/sample.txt")

  //   expect(await page.content()).toContain(
  //     "This file will be shared publicly. Are you sure?"
  //   )
  //   await page.getByRole("button", { name: "No" }).click()
  //   await page.setInputFiles('input[type="file"]', "__e2e__/upload/sample.txt")

  //   expect(await page.content()).toContain(
  //     "This file will be shared publicly. Are you sure?"
  //   )
  // })
})
