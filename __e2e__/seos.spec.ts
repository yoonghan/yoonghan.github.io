import { test, expect } from "@playwright/test"

test.describe("important! SEO urls", () => {
  test("should be able to see sitemap.xml", async ({ page }) => {
    await page.goto("/sitemap.xml")
    expect(await page.content()).toContain("https://www.walcron.com/")
  })
})
