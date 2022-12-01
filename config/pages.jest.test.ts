import {
  sortedMenuPages,
  sortedFooterPages,
  sortPagesByPath,
  sortedSiteMapPages,
  sortedPages,
  findPageByPath,
} from "./pages"
import fs from "fs"
import { paste } from "@testing-library/user-event/dist/types/clipboard"

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

describe("all sites are defined", () => {
  const getFiles = (srcpath: string): string[] => {
    return fs
      .readdirSync(srcpath, {
        withFileTypes: true,
      })
      .flatMap((file) => {
        const relativePath = `${srcpath}/${file.name}`
        if (file.isDirectory()) {
          return getFiles(relativePath)
        } else {
          return relativePath
        }
      })
  }

  const remapFiles = (
    files: string[],
    rootPath: string,
    ignoredFiles: string[]
  ): string[] => {
    const removeRootPath = (file: string) =>
      file.substring(rootPath.length, file.length)

    const removeExtension = (file: string) => file.split(".")[0]

    const renameIndex = (file: string) => {
      const replacedFile = file.replace("/index", "")
      return replacedFile === "" ? "/" : replacedFile
    }

    return files
      .map((file) => renameIndex(removeExtension(removeRootPath(file))))
      .filter(
        (file) => !ignoredFiles.includes(file) && !file.startsWith("/api")
      )
  }

  it("should be declare in actual page/ directory", async () => {
    const pagesFolder = "./pages"
    const ignoredFiles = ["/_app", "/_document"]
    const allPages = remapFiles(
      getFiles(pagesFolder),
      pagesFolder,
      ignoredFiles
    )
    expect(allPages.sort()).toEqual(sortedPages.map((page) => page.path))
  })
})
