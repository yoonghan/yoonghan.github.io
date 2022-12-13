enum FilterOption {
  NOT_MENU,
  NOT_FOOTER,
  NOT_SITE_MAP,
}

export type PageConfig = {
  path: string
  display: string
  filterOptions?: FilterOption[]
}

const pages: PageConfig[] = [
  {
    path: "/",
    display: "Home",
  },
  {
    path: "/about",
    display: "About Us",
  },
  {
    path: "/history",
    display: "History",
  },
  {
    path: "/projects",
    display: "Projects",
  },
  {
    path: "/projects/lessons",
    display: "Lessons",
    filterOptions: [FilterOption.NOT_MENU],
  },
  {
    path: "/projects/checklist",
    display: "Checklist of links",
    filterOptions: [FilterOption.NOT_MENU, FilterOption.NOT_FOOTER],
  },
  {
    path: "/projects/messenger",
    display: "Chat/Messenger",
    filterOptions: [FilterOption.NOT_MENU],
  },
  {
    path: "/experiments",
    display: "Experiments",
    filterOptions: [FilterOption.NOT_MENU, FilterOption.NOT_FOOTER],
  },
  {
    path: "/experiments/amp",
    display: "Accelerated Mobile Pages",
    filterOptions: [FilterOption.NOT_MENU],
  },
  {
    path: "/sitemap",
    display: "Site Map",
    filterOptions: [
      FilterOption.NOT_MENU,
      FilterOption.NOT_FOOTER,
      FilterOption.NOT_SITE_MAP,
    ],
  },
]

export const findPageByPath = (path: string) =>
  pages.find((page) => page.path === path)

export const sortPagesByPath = (pageConfigs: PageConfig[]) =>
  pageConfigs.sort((a: PageConfig, b: PageConfig) =>
    a.path.localeCompare(b.path)
  )

export const sortedPages = sortPagesByPath(pages)

export const sortedMenuPages = sortedPages.filter(
  (page) => !page.filterOptions?.includes(FilterOption.NOT_MENU)
)

export const sortedSiteMapPages = sortedPages.filter(
  (page) => !page.filterOptions?.includes(FilterOption.NOT_SITE_MAP)
)

export const sortedFooterPages = sortedPages.filter(
  (page) => !page.filterOptions?.includes(FilterOption.NOT_FOOTER)
)
