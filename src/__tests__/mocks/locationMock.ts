export const spyRedirect = jest.fn()
export const spySearch = jest.fn()
export const spyReload = jest.fn()

jest.mock("@/util/location", () => ({
  redirectTo: spyRedirect,
  search: spySearch,
  reload: spyReload,
}))
