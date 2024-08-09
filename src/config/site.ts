function getUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || "https://www.walcron.com"
}

function getApiUrl() {
  const apiUrl = process.env.NEXT_PUBLIC_API_SITE_URL ?? ""
  return `${apiUrl}/api`
}

const site = {
  url: getUrl(),
  apiUrl: getApiUrl(),
}

export { site, getUrl, getApiUrl }
