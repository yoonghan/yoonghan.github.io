import type { NextRequest } from "next/server"
import { sortedSiteMapPages } from "@/config/pages"

const defaultDomain = "https://www.walcron.com"

const getPriorityAndFrequency = (path: string) => {
  switch (path) {
    case "/":
      return ["0.9", "weekly"]
    case "/about":
      return ["0.8", "yearly"]
    default:
      return ["0.3", "weekly"]
  }
}

const generatedSiteMap = sortedSiteMapPages.map((sortedSiteMapPages) => {
  const [priority, frequency] = getPriorityAndFrequency(sortedSiteMapPages.path)
  return `<url>
        <loc>${defaultDomain}${sortedSiteMapPages.path}</loc>
        <changefreq>${frequency}</changefreq>
        <priority>${priority}</priority>
    </url>`
})

const handler = (req: NextRequest): Response =>
  new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"> 
    ${generatedSiteMap}
    </urlset>`,
    {
      status: 200,
      headers: {
        "content-type": "text/xml",
        "Cache-control": "stale-while-revalidate, s-maxage=3600",
      },
    }
  )

export const config = { runtime: "edge" }

export default handler
