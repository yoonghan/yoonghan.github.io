import path from "node:path"
import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react"

export default defineConfig({
	plugins: [react()],
	envPrefix: ["VITE_", "NEXT_PUBLIC_"],
	resolve: {
		tsconfigPaths: true,
		alias: [
			{
				find: /^.+\.module\.(css|sass|scss)$/,
				replacement: path.resolve(
					__dirname,
					"./src/__tests__/mocks/cssModuleProxy.ts",
				),
			},
		],
	},
	test: {
		globals: true,
		environment: "jsdom",
		setupFiles: ["./vitest.setup.ts", "vitest-canvas-mock"],
		exclude: [
			"**/node_modules/**",
			"**/dist/**",
			"**/cypress/**",
			"**/.{idea,git,cache,output,temp}/**",
			"src/__tests__/**",
			"src/__e2e__/**",
			"src/__smoke__/**",
			"crate/**",
		],
		coverage: {
			provider: "v8",
			reporter: ["text", "lcov"],
			thresholds: {
				global: {
					branches: 100,
					functions: 100,
					lines: 100,
					statements: 100,
				},
			},
			exclude: [
				"crate/**",
				"**/*.test.tsx",
				"**/*.test.ts",
				"**/layout.tsx",
				"src/app/experiments/**",
				"src/app/projects/messenger/**",
				"src/app/projects/javascript-free/**",
				"src/app/projects/game-snake/**",
				"src/instrumentation.ts",
				"src/util/location.ts",
				"src/__tests__/mocks/**",
			],
		},
	},
})
