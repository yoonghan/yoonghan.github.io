import { PageConfig } from "@/config/pages"

export interface Result {
  name: string
  children: Result[]
  pageInfo: PageConfig
}

export class SiteMapConstructor {
  readonly results: Result[] = []
  readonly level: any = { results: this.results }

  removeRootSplit = (paths: string[]) => {
    if (paths.length === 2 && paths[0] === paths[1]) {
      paths.pop()
    }
  }

  getGroups = (pageConfig: PageConfig[]) => {
    pageConfig.forEach((page) => {
      const paths = page.path.split("/")
      let acc = this.level

      this.removeRootSplit(paths)

      paths.forEach((name) => {
        if (!acc[name]) {
          acc[name] = { results: [] }
          acc.results.push({
            name,
            children: acc[name].results,
            pageInfo: page,
          })
        }
        acc = acc[name]
      })
    })
    return this.results
  }
}
