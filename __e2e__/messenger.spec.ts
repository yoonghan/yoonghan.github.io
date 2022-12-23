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
    await page.getByRole("button", { name: "Send" }).click()
    expect(page.getByPlaceholder("Your Message")).toHaveValue("")
    expect(await page.content()).toContain("Hello World")
  })

  test("should show a pop up to indicate file upload", async ({ page }) => {
    await page.goto("/projects/messenger")
    expect(await page.content()).toContain("A Walcron Chat Program")
    await page.setInputFiles('input[type="file"]', "upload/sample.txt")
    expect(await page.content()).toContain(
      "This file will be shared publicly. Are you sure?"
    )
    await page.getByRole("button", { name: "No" }).click()
    //no possible way to test this unfortunately.
    //await page.click("#file-upload-btn")
  })
})
