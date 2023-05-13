import sitemapGenerator, { config } from "@/pages/api/sitemap"
import { NextRequest } from "next/server"
import "../../__mocks__/fetchMock"

describe("sitemap", () => {
  let nextRequest = {} as NextRequest

  const noSpaceRegex = /\s/g
  const removeAllSpace = (text: string) => text.replaceAll(noSpaceRegex, "")

  it("should generate there right header", async () => {
    const response: Response = sitemapGenerator(nextRequest)
    expect(response.status).toBe(200)
    expect(response.headers).toStrictEqual({
      "Cache-control": "stale-while-revalidate, s-maxage=3600",
      "content-type": "text/xml",
    })
  })

  it("should generate there right body", async () => {
    const response: Response = sitemapGenerator(nextRequest)
    const responseText = removeAllSpace(await response.text())

    expect(
      responseText.startsWith(
        `<?xmlversion=\"1.0\"encoding=\"UTF-8\"?><urlsetxmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">`
      )
    ).toBeTruthy()
    expect(responseText.endsWith(`</urlset>`)).toBeTruthy()
    expect(responseText).toContain(
      `<url><loc>https://www.walcron.com/</loc><changefreq>weekly</changefreq><priority>0.9</priority></url>`
    )
  })

  it("should expose config with runtime set to edge as overrides does not work", () => {
    expect(config).toStrictEqual({ runtime: "edge" })
  })
})
