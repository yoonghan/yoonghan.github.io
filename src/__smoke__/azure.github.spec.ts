import { test, expect } from "@playwright/test"

test.describe("azure setup", () => {
    test("azure is setup correctly", async ({ page }, testInfo) => {
        testInfo.setTimeout(50_000) //startup needs bout 30seconds
        const response = await fetch("https://azure.walcron.com/healthz", {
            method: "GET",
        })
        expect(response.status).toBe(200)

        await page.goto("/projects/azure")
        const todoListHeading = page.getByRole("heading", { name: "Todo List" })
        await expect(todoListHeading).toBeVisible()
    })
})
