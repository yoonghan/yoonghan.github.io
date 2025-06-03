import {
  sortedMenuPagesWithFilteredHomeAndSubMenu,
  sortedFooterPages,
  sortPagesByPath,
  sortedSiteMapPages,
  sortedPages,
  findPageByPath,
  findAllChildByPath,
} from "./pages"
import fs from "fs"

describe("pages", () => {
  it("should be able to sort pages by path, nonRoot is always the last", () => {
    const pagesToSort = [
      {
        path: "/history",
        display: "History",
        description: "Walcron Progress and History",
        order: 4,
      },
      {
        path: "/",
        display: "Home",
        description: "Homepage",
        order: 1,
      },
      {
        path: "/about",
        display: "About Us",
        description: "About Us and Walcron",
        order: 2,
      },
      {
        path: "/projects/experiment",
        display: "Experiment",
        description: "Experiment",
        order: 1,
      },
      {
        path: "/projects",
        display: "Projects",
        description: "Projects",
        order: 3,
      },
    ]
    expect(sortPagesByPath(pagesToSort).map((page) => page.path)).toStrictEqual(
      ["/", "/about", "/projects", "/history", "/projects/experiment"],
    )
  })

  it("should ne able to sort non-root", () => {
    const pagesToSort = [
      {
        path: "/projects",
        display: "Projects",
        description: "Projects",
        order: 3,
      },
      {
        path: "/projects/amp",
        display: "Amp",
        description: "Amp",
        order: 2,
      },
      {
        path: "/projects/camp",
        display: "Camo",
        description: "Camp",
        order: 3,
      },
      {
        path: "/projects/experiment",
        display: "Experiment",
        description: "Experiment",
        order: 1,
      },
    ]
    expect(sortPagesByPath(pagesToSort).map((page) => page.path)).toStrictEqual(
      ["/projects", "/projects/experiment", "/projects/amp", "/projects/camp"],
    )
  })

  it("should sort sorted pages", () => {
    const allPages = sortedPages.map((page) => page.path)
    expect(allPages[0]).toBe("/")
    expect(allPages[1]).toBe("/about")
  })

  it("should filter menu with NON_MENU filterOption", () => {
    const menuPageMappedByDisplay =
      sortedMenuPagesWithFilteredHomeAndSubMenu.map((page) => page.path)
    expect(menuPageMappedByDisplay).not.toContain("/")
    expect(menuPageMappedByDisplay).not.toContain(["/projects/lessons"])
    expect(menuPageMappedByDisplay).toContain("/experiments")
  })

  it("should filter footer with NON_FOOTER filterOption", () => {
    const footerPageMappedByDisplay = sortedFooterPages.map((page) => page.path)
    expect(footerPageMappedByDisplay).toContain("/projects")
    expect(footerPageMappedByDisplay).not.toContain(["/sitemap"])
  })

  it("should filter sitemap with NON_SITE_MAP filterOption", () => {
    const footerPageMappedByDisplay = sortedSiteMapPages.map(
      (page) => page.path,
    )
    expect(footerPageMappedByDisplay).not.toContain(["/sitemap"])
  })

  it("should be able to ge pageConfig by path", () => {
    expect(findPageByPath("/about")).toStrictEqual({
      display: "About Us",
      order: 2,
      path: "/about",
    })
  })

  it("should be able to list out all the child by path", () => {
    const expectedResult = [
      {
        path: "/experiments/performance",
        display: "Performance",
      },
      {
        path: "/experiments/aria",
        display: "Accessibility (WCAG)",
      },
      {
        path: "/experiments/storybook",
        display: "Storybook",
      },
      {
        path: "/experiments/homepage-v1",
        display: "Parallax Homepage",
      },
    ]

    expect(findAllChildByPath("/about")).toStrictEqual([])
    expect(
      findAllChildByPath("/experiments").map(({ path, display }) => ({
        path,
        display,
      })),
    ).toStrictEqual(expectedResult)
    expect(
      findAllChildByPath("/experiments/performance").map(
        ({ path, display }) => ({
          path,
          display,
        }),
      ),
    ).toStrictEqual(expectedResult)
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

  const remapAppFiles = (files: string[], rootPath: string): string[] => {
    const removeRootPath = (file: string) =>
      file.substring(rootPath.length, file.length)

    const appPageFile = "/page"

    const removeExtension = (file: string) => file.split(".")[0]

    const removePage = (file: string) => {
      const filePath = file.substring(0, file.length - appPageFile.length)
      return filePath === "" ? "/" : filePath
    }

    return files
      .filter(
        (file: string) =>
          file.indexOf("/.") === -1 && file.indexOf(".test.") === -1,
      ) //remove all hidden files, like .DS_Store and .test.
      .map((file) => removeExtension(removeRootPath(file)))
      .filter((file) => file.endsWith(appPageFile))
      .map(removePage)
  }

  it("should be declare in actual page/ directory", async () => {
    const appFolder = "./src/app"
    const allApp = remapAppFiles(getFiles(appFolder), appFolder)
    expect(allApp.sort()).toEqual(sortedPages.map((page) => page.path).sort())
  })
})
