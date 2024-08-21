import { setEnv } from "@/__tests__/mocks/setEnv"

describe("root-url", () => {
  it("should be default with local website", async () => {
    setEnv({
      NEXT_PUBLIC_SITE_URL: "",
    })
    const { site } = await import("./site")
    expect(site.url).toBe("https://www.walcron.com")
    expect(site.apiUrl).toBe("/api")
  })

  it("should getUrl from env", async () => {
    const url = "https://yoonghan.github.io"
    setEnv({ NEXT_PUBLIC_SITE_URL: url })
    const { getUrl } = await import("./site")
    expect(getUrl()).toBe(url)
  })

  it("should override local API url from env", async () => {
    setEnv({ NEXT_PUBLIC_API_SITE_URL: "https://yoonghan.github.io" })
    const { getApiUrl } = await import("./site")
    expect(getApiUrl()).toBe("https://yoonghan.github.io/api")
  })

  it("should use blank API url if undefined", async () => {
    setEnv({ NEXT_PUBLIC_API_SITE_URL: undefined })
    const { getApiUrl } = await import("./site")
    expect(getApiUrl()).toBe("/api")
  })

  it("should override ga4id", async () => {
    setEnv({ NEXT_PUBLIC_GA_4_ID: "G-Test" })
    const { getGA4Id } = await import("./site")
    expect(getGA4Id()).toBe("G-Test")
  })

  it("should use blank ga4id if undefined", async () => {
    setEnv({ NEXT_PUBLIC_GA_4_ID: undefined })
    const { getGA4Id } = await import("./site")
    expect(getGA4Id()).toBe("")
  })
})
