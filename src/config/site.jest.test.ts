import { setEnv } from "@/__tests__/mocks/setEnv"

describe("root-url", () => {
  it("should be default with walcron", async () => {
    const { site } = await import("./site")
    expect(site.url).toBe("https://www.walcron.com")
    expect(site.apiUrl).toBe("https://www.walcron.com/api")
  })

  it("should getUrl from env", async () => {
    const url = "https://yoonghan.github.io"
    setEnv({ SITE_URL: url })
    const { getUrl } = await import("./site")
    expect(getUrl()).toBe(url)
  })

  it("should getUrl + getApiUrl from env", async () => {
    const url = "https://yoonghan.github.io"
    setEnv({ SITE_URL: url })
    const { getApiUrl } = await import("./site")
    expect(getApiUrl()).toBe(url + "/api")
  })
})
