import { test, expect } from "@playwright/test"

test.describe("gtag setup", () => {
  test("gtag is setup", async ({ page }) => {
    await page.goto("/")
    const gtagId = page.locator(
      'script[src="https://www.googletagmanager.com/gtag/js?id=GTM-5N4NT69"]',
    )
    await expect(gtagId).toHaveAttribute("src")
  })
})
