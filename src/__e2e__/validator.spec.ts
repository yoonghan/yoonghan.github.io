import { expect, test } from "@playwright/test"

test.describe("Validator", () => {
    test("should render page properly", async ({ page }) => {
        await page.goto("/validator")
        expect(await page.content()).toContain("Validator")
    })

    test("should expect React Compiler to work", async ({ page }) => {
        await page.goto("/validator")
        expect(page.getByRole("button", { name: "0 - 0" })).toBeVisible()
        await page.getByRole("button", { name: "0 - 0" }).click()
        expect(page.getByRole("button", { name: "1 - 0" })).toBeVisible()
        await page.getByRole("button", { name: "1 - 0" }).click()
        expect(page.getByRole("button", { name: "2 - 0" })).toBeVisible()
    })
})