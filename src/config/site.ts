function getSiteUrl() {
  return process.env.SITE_URL || ""
}

const site = { url: getSiteUrl() }

export { site, getSiteUrl }
