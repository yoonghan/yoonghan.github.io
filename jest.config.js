const nextJest = require("next/jest")

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
})

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: [
    "<rootDir>/jest.setup.js",
    "react-intersection-observer/test-utils",
  ],
  modulePathIgnorePatterns: ["<rootDir>/__tests__/utils"],
  moduleNameMapper: {
    // Handle module aliases (this will be automatically configured for you soon)
    "^@/components/(.*)$": "<rootDir>/components/$1",
    "^@/pageComponents/(.*)$": "<rootDir>/pageComponents/$1",
    "^@/pages/(.*)$": "<rootDir>/pages/$1",
    "^@/config/(.*)$": "<rootDir>/config/$1",
    "^@/images/*": "<rootDir>/public/img/$1",
  },
  testEnvironment: "jest-environment-jsdom",
  coverageReporters: ["text", "cobertura"],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig)
