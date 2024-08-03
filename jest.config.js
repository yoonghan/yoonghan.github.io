const nextJest = require("next/jest")

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
})

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFiles: ["jest-canvas-mock"],
  setupFilesAfterEnv: [
    "<rootDir>/jest.setup.js",
    "react-intersection-observer/test-utils",
  ],
  modulePathIgnorePatterns: [
    "<rootDir>/src/__tests__/utils",
    "<rootDir>/src/__e2e__",
    "<rootDir>/crate",
  ],
  moduleNameMapper: {
    // Handle module aliases (this will be automatically configured for you soon)
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@/__mocks__/*": "<rootDir>/__mocks__/$1",
    "^@/images/*": "<rootDir>/public/img/$1",
    "^@/util/*": "<rootDir>/util/$1",
  },
  testEnvironment: "jsdom",
  coverageReporters: ["text", "cobertura"],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  coveragePathIgnorePatterns: ["<rootDir>/crate", "layout.tsx", "page.tsx"],
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig)
