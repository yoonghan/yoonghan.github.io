import { PageConfig, sortedSiteMapPages } from "@/config/pages"

export interface Result {
  name: string
  children: Result[]
  pageInfo: PageConfig
}

export class SiteMapConstructor {
  private results: Result[] = []
  private level: any = { results: this.results }

  removeRootSplit = (paths: string[]) => {
    if (paths.length === 2 && paths[0] === "" && paths[1] === "") {
      paths.pop()
    }
  }

  getGroups = (pageConfig: PageConfig[]) => {
    pageConfig.forEach((page) => {
      const paths = page.path.split("/")

      this.removeRootSplit(paths)

      paths.reduce((acc, name) => {
        if (!acc[name]) {
          acc[name] = { results: [] }
          acc.results.push({
            name,
            children: acc[name].results,
            pageInfo: page,
          })
        }

        return acc[name]
      }, this.level)
    })
    return this.results
  }
}
