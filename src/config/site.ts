function getUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || "https://www.walcron.com"
}

function getApiUrl() {
  const apiUrl = process.env.NEXT_PUBLIC_API_SITE_URL ?? ""
  return `${apiUrl}/api`
}

function getGA4Id() {
  return process.env.NEXT_PUBLIC_GA_4_ID ?? ""
}

const site = {
  url: getUrl(),
  apiUrl: getApiUrl(),
  ga4Id: getGA4Id(),
}

export { site, getUrl, getApiUrl, getGA4Id }
