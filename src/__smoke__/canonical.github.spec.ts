import { test, expect, BrowserContext } from "@playwright/test"

test.describe("canonical setup", () => {
  const validateCanonicalRel = async (
    context: BrowserContext,
    site: string
  ) => {
    const page = await context.newPage()
    await page.goto(site === "" ? "/" : site)
    const metaDescription = page.locator('link[rel="canonical"]')
    await expect(metaDescription).toHaveAttribute(
      "href",
      `https://www.walcron.com${site}`
    )
  }

  test("canonical is setup to walcron", async ({ context }) => {
    await validateCanonicalRel(context, "")
  })

  test("important main pages to have right canonical", async ({ context }) => {
    const pendingValidation = [
      "/about",
      "/history",
      "/projects",
      "/projects/webrtc",
      "/projects/checklist",
      "/projects/lessons",
      "/experiments",
      "/experiments/storybook",
    ].map(async (site) => await validateCanonicalRel(context, site))
    await Promise.all(pendingValidation)
  })
})
