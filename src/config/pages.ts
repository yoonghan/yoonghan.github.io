enum FilterOption {
  NOT_MENU,
  NOT_FOOTER,
  NOT_SITE_MAP,
}

export type PageConfig = {
  path: string
  display: string
  filterOptions?: FilterOption[]
  order: number
}

const pages: PageConfig[] = [
  {
    path: "/",
    display: "Home",
    filterOptions: [FilterOption.NOT_MENU],
    order: 1,
  },
  {
    path: "/about",
    display: "About Us",
    order: 2,
  },
  {
    path: "/history",
    display: "History",
    order: 3,
  },
  {
    path: "/projects",
    display: "Projects",
    order: 4,
  },
  {
    path: "/projects/microfrontend",
    display: "Microfrontend",
    order: 1,
  },
  {
    path: "/projects/webrtc",
    display: "WebRtc",
    order: 2,
  },
  {
    path: "/projects/messenger",
    display: "Chat",
    order: 3,
  },
  {
    path: "/projects/game-snake",
    display: "Game",
    order: 4,
  },
  {
    path: "/projects/lessons",
    display: "Lessons",
    filterOptions: [FilterOption.NOT_FOOTER],
    order: 5,
  },
  {
    path: "/projects/learning",
    display: "Learning",
    filterOptions: [FilterOption.NOT_FOOTER],
    order: 6,
  },
  {
    path: "/projects/checklist",
    display: "Checklist",
    filterOptions: [FilterOption.NOT_FOOTER],
    order: 7,
  },
  {
    path: "/projects/javascript-free",
    display: "No Javascript",
    order: 8,
  },
  {
    path: "/experiments",
    display: "Experiments",
    filterOptions: [FilterOption.NOT_FOOTER],
    order: 5,
  },
  {
    path: "/experiments/performance",
    display: "Performance",
    order: 1,
  },
  {
    path: "/experiments/aria",
    display: "Accessibility (WCAG)",
    order: 2,
  },
  {
    path: "/experiments/storybook",
    display: "Storybook",
    order: 3,
  },
  {
    path: "/sitemap",
    display: "Site Map",
    filterOptions: [
      FilterOption.NOT_MENU,
      FilterOption.NOT_FOOTER,
      FilterOption.NOT_SITE_MAP,
    ],
    order: 6,
  },
]

export const findPageByPath = (path: string) =>
  pages.find((page) => page.path === path)

export const findAllChildByPath = (path: string) => {
  const parentPath = isSubMenu(path) ? "/" + path.split("/")[1] : path
  return pages.filter((page) => page.path.startsWith(parentPath + "/"))
}

export const sortPagesByPath = (pageConfigs: PageConfig[]) => {
  const pathOrder = ({ order, path }: { order: number; path: string }) => {
    const isPathRoot = path.split("/").length == 2
    return isPathRoot ? `${order}-${path}` : `99-${order}-${path}`
  }
  return pageConfigs.sort((a: PageConfig, b: PageConfig) => {
    const aPathWithOrder = pathOrder(a)
    const bPathWithOrder = pathOrder(b)
    return aPathWithOrder.localeCompare(bPathWithOrder)
  })
}

export const sortedPages = sortPagesByPath(pages)

const isSubMenu = (path: string) => path.split("/").length !== 2

export const sortedMenuPagesWithFilteredHomeAndSubMenu = sortedPages.filter(
  (page) =>
    !page.filterOptions?.includes(FilterOption.NOT_MENU) &&
    !isSubMenu(page.path),
)

export const sortedSiteMapPages = sortedPages.filter(
  (page) => !page.filterOptions?.includes(FilterOption.NOT_SITE_MAP),
)

export const sortedFooterPages = sortedPages.filter(
  (page) => !page.filterOptions?.includes(FilterOption.NOT_FOOTER),
)
