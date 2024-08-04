function getUrl() {
  return process.env.SITE_URL || "https://www.walcron.com"
}

function getApiUrl() {
  return `${getUrl()}/api`
}

const site = {
  url: getUrl(),
  apiUrl: getApiUrl(),
}

export { site, getUrl, getApiUrl }
