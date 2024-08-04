import "@/__tests__/mocks/site"
import sitemapGenerator from "./sitemap"
import "@/__tests__/mocks/fetchMock"

describe("sitemap", () => {
  it("should generate there right body", () => {
    const response = sitemapGenerator()
    expect(response[0].url).toBe("https://mockedUrl.com/")
    expect(response[0].lastModified).not.toBe(undefined)
    expect(response[1].url).toBe("https://mockedUrl.com/about")
    expect(response[1].lastModified).not.toBe(undefined)
  })
})
