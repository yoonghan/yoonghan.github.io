import { test, expect } from "@playwright/test"

test.describe("important! PWA urls", () => {
  test("should be able to brose a generated service-worker", async ({
    page,
  }) => {
    await page.goto("/sw.js")
    expect(await page.content()).toContain("workbox")
  })

  test("should be able to manifest.json for PWA download", async ({ page }) => {
    await page.goto("/manifest.json")
    expect(await page.content()).toContain("/?utm_source=launcher")
  })

  test("should be able to browse assetlinks to indicate it's an android download", async ({
    page,
  }) => {
    await page.goto("/.well-known/assetlinks.json")
    expect(await page.content()).toContain("com.walcron.web")
  })
})
