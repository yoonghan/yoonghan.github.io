export const redirectTo = (url: string) => {
  globalThis.location.assign(url)
}

export const search = () => globalThis.location.search

export const reload = () => globalThis.location.reload()
