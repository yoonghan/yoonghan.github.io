const nextJest = require("next/jest");

const createJestConfig = nextJest({
	// Provide the path to your Next.js app to load next.config.js and .env files in your test environment
	dir: "./",
});

// Add any custom config to be passed to Jest
const customJestConfig = {
	setupFiles: ["jest-canvas-mock"],
	setupFilesAfterEnv: [
		"<rootDir>/jest.setup.js",
		"react-intersection-observer/test-utils",
	],
	transformIgnorePatterns: ["/node_modules/(?!react-ga4/)/"],
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
	coverageReporters: ["text", "lcov"],
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
		"<rootDir>/src/app/projects/messenger/*",
		"<rootDir>/src/app/projects/javascript-free/*",
		"<rootDir>/src/app/projects/game-snake/*",
		"<rootDir>/src/instrumentation.ts",
		"<rootDir>/src/util/location.ts",
	],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
const asyncConfig = createJestConfig(customJestConfig);

module.exports = async () => {
	const config = await asyncConfig();
	config.transformIgnorePatterns = [
		"/node_modules/(?!(react-ga4|geist)/)(?!.pnpm)",
		"^.+\\.module\\.(css|sass|scss)$",
	];
	return config;
};
