export const spyRedirect = vi.fn()
export const spySearch = vi.fn()
export const spyReload = vi.fn()

vi.mock("@/util/location", () => ({
	redirectTo: spyRedirect,
	search: spySearch,
	reload: spyReload,
}))