import { sortedSiteMapPages } from "@/config/pages"
import { site } from "@/config/site"
import { MetadataRoute } from "next"

const defaultDomain = site.url

const getPriorityAndFrequency = (path: string) => {
  switch (path) {
    case "/":
      return { priority: 0.9, frequency: "weekly" }
    case "/about":
      return { priority: 0.8, frequency: "yearly" }
    default:
      return { priority: 0.3, frequency: "weekly" }
  }
}

const generatedSiteMap = sortedSiteMapPages.map((sortedSiteMapPages) => {
  const { priority, frequency } = getPriorityAndFrequency(
    sortedSiteMapPages.path
  )
  return {
    url: `${defaultDomain}${sortedSiteMapPages.path}`,
    lastModified: new Date(),
    changefreq: frequency,
    priority: priority,
  }
})

const handler = (): MetadataRoute.Sitemap => generatedSiteMap

export default handler
