jest.mock("@/config/site", () => {
  return {
    __esModule: true,
    site: { url: "https://mockedUrl.com" },
  }
})
