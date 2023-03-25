export const usePathnameFn = jest.fn()

jest.mock("next/navigation", () => ({
  usePathname: usePathnameFn,
  useRouter: jest.fn(),
}))
