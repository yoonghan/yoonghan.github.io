function getSiteUrl() {
  return process.env.SITE_URL || "https://www.walcron.com"
}

const site = { url: getSiteUrl() }

export { site, getSiteUrl }
