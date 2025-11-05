import { test, expect } from "@playwright/test"

test.describe("important! SEO urls", () => {
  test("should be able to see sitemap.xml", async ({ page }) => {
    await page.goto("/sitemap.xml")
    expect(await page.content()).toContain(
      "<loc>https://www.walcron.com/</loc>",
    )
  })

  test("should be able to see robots.txt", async ({ page }) => {
    await page.goto("/robots.txt")
    expect(await page.content()).toContain(
      "Sitemap: https://www.walcron.com/sitemap.xml",
    )
  })
})
