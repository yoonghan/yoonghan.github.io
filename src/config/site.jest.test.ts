import { setEnv } from "@/__tests__/mocks/setEnv"

describe("root-url", () => {
  it("should be default as blank", async () => {
    const { site } = await import("./site")
    expect(site.url).toBe("https://www.walcron.com")
  })

  it("should be fixed as https://www.walcron.com", async () => {
    const url = "https://yoonghan.github.io"
    setEnv({ SITE_URL: url })
    const { getSiteUrl } = await import("./site")
    expect(getSiteUrl()).toBe(url)
  })
})
