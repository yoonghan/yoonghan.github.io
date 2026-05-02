export const usePathnameFn = vi.fn()

vi.mock("next/navigation", () => ({
	usePathname: usePathnameFn,
	useRouter: vi.fn(),
}))