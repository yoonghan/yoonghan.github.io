/* eslint-disable testing-library/prefer-screen-queries */
import { test, expect } from "@playwright/test"

test.describe("important! PWA urls", () => {
  // no longer generates
  test("should contain service-worker, if missing make sure it's not running dev", async ({
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

  test("can enable pwa registration", async ({ page }) => {
    const openPWADialog = async () => {
      await page.getByRole("button", { name: "search" }).click()
      await page.getByRole("combobox", { name: "Command prompt" }).fill("pwa")
      await page
        .getByRole("combobox", { name: "Command prompt" })
        .press("Enter")
    }

    const assertButtonState = async (text: string) => {
      await expect(
        page.locator("label").filter({ hasText: text })
      ).toBeInViewport()
    }

    await page.goto("/")
    await page.setViewportSize({
      width: 1024,
      height: 640,
    })

    await openPWADialog()
    // First enable
    await page.locator("label").filter({ hasText: "Disabled" }).click()
    await assertButtonState("Installed")

    await page.reload()
    await openPWADialog()
    // Is enabled
    await assertButtonState("Installed")

    // Unregister
    await page.locator("label").filter({ hasText: "Installed" }).click()
    await assertButtonState("Disabled")
  })
})
