function getUrl() {
  return process.env.SITE_URL || "https://www.walcron.com"
}

function getApiUrl() {
  const apiUrl = process.env.IS_LOCAL_API_SITE_URL === "true" ? "" : getUrl()
  return `${apiUrl}/api`
}

const site = {
  url: getUrl(),
  apiUrl: getApiUrl(),
}

export { site, getUrl, getApiUrl }
