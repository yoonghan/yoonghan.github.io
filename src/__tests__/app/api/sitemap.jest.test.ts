import sitemapGenerator from "@/app/sitemap"
import "../../../__mocks__/fetchMock"

describe("sitemap", () => {
  it("should generate there right body", () => {
    const response = sitemapGenerator()
    expect(response[0].url).toBe("https://www.walcron.com/")
    expect(response[0].lastModified).not.toBe(undefined)
    expect(response[1].url).toBe("https://www.walcron.com/about")
    expect(response[1].lastModified).not.toBe(undefined)
  })
})
