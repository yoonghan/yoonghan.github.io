import { setEnv } from "@/__tests__/mocks/setEnv"

describe("root-url", () => {
  it("should be default with local website", async () => {
    setEnv({
      NEXT_PUBLIC_SITE_URL: "",
      NEXT_PUBLIC_IS_LOCAL_API_SITE_URL: "false",
    })
    const { site } = await import("./site")
    expect(site.url).toBe("https://www.walcron.com")
    expect(site.apiUrl).toBe("https://www.walcron.com/api")
  })

  it("should getUrl from env", async () => {
    const url = "https://yoonghan.github.io"
    setEnv({ NEXT_PUBLIC_SITE_URL: url })
    const { getUrl } = await import("./site")
    expect(getUrl()).toBe(url)
  })

  it("should getUrl + getApiUrl from env", async () => {
    const url = "https://yoonghan.github.io"
    setEnv({
      NEXT_PUBLIC_SITE_URL: url,
      NEXT_PUBLIC_IS_LOCAL_API_SITE_URL: "false",
    })
    const { getApiUrl } = await import("./site")
    expect(getApiUrl()).toBe(url + "/api")
  })

  it("should overridde API URL from env", async () => {
    setEnv({ NEXT_PUBLIC_IS_LOCAL_API_SITE_URL: "true" })
    const { getApiUrl } = await import("./site")
    expect(getApiUrl()).toBe("/api")
  })
})
