import { sortedSiteMapPages } from "@/config/pages"
import { MetadataRoute } from "next"

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
  return {
    url: `${defaultDomain}${sortedSiteMapPages.path}`,
    lastModified: new Date(),
    changefreq: frequency,
    priority: priority,
  }
})

const handler = (): MetadataRoute.Sitemap => generatedSiteMap

export default handler
