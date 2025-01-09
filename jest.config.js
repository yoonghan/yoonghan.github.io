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
    "<rootDir>/src/__tests__",
    "<rootDir>/src/__e2e__",
    "<rootDir>/src/__smoke__",
    "<rootDir>/crate",
  ],
  moduleNameMapper: {
    // Handle module aliases (this will be automatically configured for you soon)
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@/images/*": "<rootDir>/public/img/$1",
    "^@/util/*": "<rootDir>/src/util/$1",
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
  coveragePathIgnorePatterns: [
    "<rootDir>/crate",
    "layout.tsx",
    "<rootDir>/src/app/experiments/*",
    "<rootDir>/src/app/projects/*",
    "<rootDir>/src/instrumentation.ts",
  ],
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig)
