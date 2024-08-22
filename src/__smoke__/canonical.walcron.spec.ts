import { test, expect } from "@playwright/test"

test.describe("canonical setup", () => {
  test("canonical is setup to walcron", async ({ page }) => {
    await page.goto("/")
    const metaDescription = page.locator('link[rel="canonical"]')
    await expect(metaDescription).not.toBeVisible()
  })
})
