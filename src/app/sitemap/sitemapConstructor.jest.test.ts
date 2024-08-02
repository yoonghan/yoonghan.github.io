import { PageConfig } from "@/config/pages"
import { SiteMapConstructor } from "./sitemapConstructor"

describe("sitemap constructor", () => {
  let siteMapConstructor = new SiteMapConstructor()

  beforeEach(() => {
    siteMapConstructor = new SiteMapConstructor()
  })

  it("should be grouping pages at root /", () => {
    const pageConfig = [
      {
        path: "/",
        display: "Home",
      },
    ] as PageConfig[]
    const sectionObject = siteMapConstructor.getGroups(pageConfig)
    expect(sectionObject).toHaveLength(1)
    expect(sectionObject[0].name).toBe("")
    expect(sectionObject[0].pageInfo).toBe(pageConfig[0])
    expect(sectionObject[0].children).toStrictEqual([])
  })

  it("should be grouping pages with 2 level", () => {
    const pageConfig: PageConfig[] = [
      {
        path: "/",
        display: "Home",
      },
      {
        path: "/about",
        display: "About",
      },
      {
        path: "/history",
        display: "History",
      },
    ] as PageConfig[]
    const sectionObject = siteMapConstructor.getGroups(pageConfig)
    expect(sectionObject).toHaveLength(1)
    expect(sectionObject[0].children).toHaveLength(2)
    expect(sectionObject[0].children[0].pageInfo).toStrictEqual({
      path: "/about",
      display: "About",
    })
  })

  it("should be grouping pages with 3 level", () => {
    const pageConfig = [
      {
        path: "/",
        display: "Home",
      },
      {
        path: "/about",
        display: "About",
      },
      {
        path: "/about/you",
        display: "About You",
      },
      {
        path: "/project",
        display: "Projects",
      },
      {
        path: "/project/lesson",
        display: "Lesson",
      },
    ] as PageConfig[]
    const sectionObject = siteMapConstructor.getGroups(pageConfig)
    expect(sectionObject).toHaveLength(1)
    expect(sectionObject[0].children).toHaveLength(2)
    expect(sectionObject[0].children[0].children).toHaveLength(1)
    expect(sectionObject[0].children[1].children).toHaveLength(1)
    expect(sectionObject[0].children[1].children[0].pageInfo).toStrictEqual({
      path: "/project/lesson",
      display: "Lesson",
    })
  })
})
