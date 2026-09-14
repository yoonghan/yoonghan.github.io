declare module "*module.css" {
	const styles: {
		[className: string]: string
	}
	export default styles
}

declare namespace vi {
	type Mock<T = any, Y extends any[] = any[]> = import("vitest").Mock<T, Y>
	type SpyInstance<T = any, Y extends any[] = any[]> = import("vitest").MockInstance<T, Y>
}

declare function fail(message?: string): void