import {
  sortedMenuPages,
  sortedFooterPages,
  sortPagesByPath,
  sortedSiteMapPages,
  sortedPages,
  findPageByPath,
} from "./pages"

describe("pages", () => {
  it("should be able to sort pages by path", () => {
    const pagesToSort = [
      {
        path: "/history",
        display: "History",
        description: "Walcron Progress and History",
      },
      {
        path: "/",
        display: "Home",
        description: "Homepage",
      },
      {
        path: "/about",
        display: "About Us",
        description: "About Us and Walcron",
      },
    ]
    expect(sortPagesByPath(pagesToSort).map((page) => page.path)).toStrictEqual(
      ["/", "/about", "/history"]
    )
  })

  it("should sort sorted pages", () => {
    const allPages = sortedPages.map((page) => page.path)
    expect(allPages[0]).toBe("/")
    expect(allPages[1]).toBe("/about")
  })

  it("should filter menu with NON_MENU filterOption", () => {
    const menuPageMappedByDisplay = sortedMenuPages.map((page) => page.path)
    expect(menuPageMappedByDisplay).toContain("/")
    expect(menuPageMappedByDisplay).not.toContain(["/projects/lessons"])
  })

  it("should filter footer with NON_FOOTER filterOption", () => {
    const footerPageMappedByDisplay = sortedFooterPages.map((page) => page.path)
    expect(footerPageMappedByDisplay).toContain("/projects/lessons")
    expect(footerPageMappedByDisplay).not.toContain(["/sitemap"])
  })

  it("should filter sitemap with NON_SITE_MAP filterOption", () => {
    const footerPageMappedByDisplay = sortedSiteMapPages.map(
      (page) => page.path
    )
    expect(footerPageMappedByDisplay).not.toContain(["/sitemap"])
  })

  it("should be able to pageConfig by path", () => {
    expect(findPageByPath("/about")).toStrictEqual({
      display: "About Us",
      path: "/about",
    })
  })
})
