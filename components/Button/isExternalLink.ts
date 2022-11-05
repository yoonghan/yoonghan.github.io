export const isExternalLink = (href: string) =>
  href && /^(http:\/\/)|(https:\/\/)|^\/\//.test(href)
