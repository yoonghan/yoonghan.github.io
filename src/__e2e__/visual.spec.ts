import { test, expect } from "@playwright/test";

test.describe("Visual Regression Tests", () => {
	test("Homepage", async ({ page }) => {
		await page.goto("/?animate=none");
		await page.waitForTimeout(1200); // from backstop delay
		await expect(page).toHaveScreenshot("homepage.png", { fullPage: true });
	});

	test("Homepage with cookie accepted", async ({ page, context }) => {
		await context.addCookies([
			{
				name: "termsGranted",
				value: "true",
				domain: "localhost",
				path: "/",
			},
		]);
		await page.goto("/?animate=none");
		await page.waitForTimeout(500); // from backstop delay
		await expect(page).toHaveScreenshot("homepage-cookie.png", { fullPage: true });
	});

	test("Homepage Commandbar search on table", async ({ page, context }, testInfo) => {
		// Only run for tablet
		if (testInfo.project.name !== "tablet") return;

		await context.addCookies([
			{
				name: "termsGranted",
				value: "true",
				domain: "localhost",
				path: "/",
			},
		]);
		await page.goto("/?animate=none");
		await page.waitForTimeout(100);
		// buttonClickByName: "search"
		const searchButton = page.getByRole('button', { name: /search/i }).or(page.locator('button[name="search"]'));
		if (await searchButton.count() > 0) {
			await searchButton.first().click();
		} else {
			// Fallback if role doesn't match perfectly, might need adjustment based on exact DOM
			await page.locator('text=search').first().click();
		}

		await page.waitForTimeout(2000); // postInteractionWait
		await expect(page).toHaveScreenshot("homepage-search.png", { fullPage: false }); // requireSameDimensions: false in backstop
	});

	test("About Page", async ({ page, context }) => {
		await context.addCookies([
			{
				name: "termsGranted",
				value: "true",
				domain: "localhost",
				path: "/",
			},
		]);
		await page.goto("/about");
		await page.waitForTimeout(100);
		await expect(page).toHaveScreenshot("about.png", { fullPage: true });
	});

	test("History Page", async ({ page, context }) => {
		await context.addCookies([
			{
				name: "termsGranted",
				value: "true",
				domain: "localhost",
				path: "/",
			},
		]);
		await page.goto("/history");
		await page.waitForTimeout(100);
		await expect(page).toHaveScreenshot("history.png", { fullPage: true });
	});

	test("Projects Page", async ({ page, context }) => {
		await context.addCookies([
			{
				name: "termsGranted",
				value: "true",
				domain: "localhost",
				path: "/",
			},
		]);
		await page.goto("/projects");
		await page.waitForTimeout(200);
		await expect(page).toHaveScreenshot("projects.png", { fullPage: true });
	});

	test("Sitemap Page", async ({ page, context }) => {
		await context.addCookies([
			{
				name: "termsGranted",
				value: "true",
				domain: "localhost",
				path: "/",
			},
		]);
		await page.goto("/site-map");
		await page.waitForTimeout(200); // delay
		await page.waitForTimeout(60); // postInteractionWait
		await expect(page).toHaveScreenshot("sitemap.png", { fullPage: true });
	});

	test("Page not found", async ({ page, context }) => {
		await context.addCookies([
			{
				name: "termsGranted",
				value: "true",
				domain: "localhost",
				path: "/",
			},
		]);
		await page.goto("/pagenotfound");
		await page.waitForTimeout(100);
		await expect(page).toHaveScreenshot("not-found.png", { fullPage: true });
	});

	test("Storybook", async ({ page, context }) => {
		await context.addCookies([
			{
				name: "termsGranted",
				value: "true",
				domain: "localhost",
				path: "/",
			},
		]);
		await page.goto("/experiments/storybook?animate=none");
		await page.waitForTimeout(100);
		await page.waitForTimeout(500); // postInteractionWait
		await expect(page).toHaveScreenshot("storybook.png", { fullPage: true });
	});

	test("Storybook - Confirmation", async ({ page, context }) => {
		await context.addCookies([
			{
				name: "termsGranted",
				value: "true",
				domain: "localhost",
				path: "/",
			},
		]);
		await page.goto("/experiments/storybook?animate=none");
		await page.waitForTimeout(100);

		await page.locator("text=Show Confirmation Dialog").click();
		await page.waitForTimeout(500); // postInteractionWait

		await expect(page).toHaveScreenshot("storybook-confirmation.png", { fullPage: true });
	});
});
