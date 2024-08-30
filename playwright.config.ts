import { PlaywrightTestConfig, devices } from "@playwright/test"
import path from "path"

// Set webServer.url and use.baseURL with the location of the WebServer respecting the correct set port
const baseURL = `https://walcron-git-develop-walcron-coorperations-projects.vercel.app`

// Reference: https://playwright.dev/docs/test-configuration
const config: PlaywrightTestConfig = {
  // Timeout per test
  timeout: 30 * 1000,
  // Test directory
  testDir: path.join(__dirname, "src/__e2e__"),
  // If a test fails, retry it additional 1 time
  retries: 1,
  // Artifacts folder where screenshots, videos, and traces are stored.
  outputDir: "test-results/",

  // Run your local dev server before starting the tests:
  // https://playwright.dev/docs/test-advanced#launching-a-development-web-server-during-the-tests
  // For some reason this no longer works.
  // webServer: {
  //   command: "npm run dev",
  //   url: baseURL,
  //   timeout: 120 * 1000,
  //   reuseExistingServer: process.env.CI === "true",
  // },

  use: {
    // Use baseURL so to make navigations relative.
    // More information: https://playwright.dev/docs/api/class-testoptions#test-options-base-url
    baseURL,

    // Retry a test if its failing with enabled tracing. This allows you to analyse the DOM, console logs, network traffic etc.
    // More information: https://playwright.dev/docs/trace-viewer
    trace: "retry-with-trace",

    // All available context options: https://playwright.dev/docs/api/class-browser#browser-new-context
    // contextOptions: {
    //   ignoreHTTPSErrors: true,
    // },
  },

  projects: [
    {
      name: "Mobile Chrome",
      use: { ...devices["Pixel 5"] },
    },
  ],
}
export default config
