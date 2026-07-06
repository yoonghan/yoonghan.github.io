import path from "node:path"
import { type PlaywrightTestConfig } from "@playwright/test"

const baseURL = `http://localhost:3000`

const config: PlaywrightTestConfig = {
	timeout: 30 * 1000,
	testDir: path.join(__dirname, "src/__e2e__"),
	testMatch: /visual\.spec\.ts/,
	retries: 0,
	outputDir: "visual-results/",

	webServer: {
	  command: "npm run build && npm run start",
	  url: baseURL,
	  timeout: 120 * 1000,
	  reuseExistingServer: !process.env.CI,
	},

	use: {
		baseURL,
		trace: "on-first-retry",
	},

	projects: [
		{
			name: "phone",
			use: { 
				viewport: { width: 320, height: 1024 },
				userAgent: "Mozilla/5.0 (Linux; Android 10; Pixel 5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36",
			},
		},
		{
			name: "tablet",
			use: { 
				viewport: { width: 1024, height: 768 },
				userAgent: "Mozilla/5.0 (iPad; CPU OS 13_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1 Mobile/15E148 Safari/604.1",
			},
		},
	],
}
export default config
