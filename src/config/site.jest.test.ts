import { setEnv } from "src/__mocks__/setEnv"

describe("root-url", () => {
  it("should be default as blank", async () => {
    const { site } = await import("./site")
    expect(site.url).toBe("")
  })

  it("should be fixed as https://www.walcron.com", async () => {
    const url = "https://www.walcron.com"
    setEnv({ SITE_URL: url })
    const { getSiteUrl } = await import("./site")
    expect(getSiteUrl()).toBe(url)
  })
})
