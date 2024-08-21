const defaultUrl = "https://www.walcron.com"

function getUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || defaultUrl
}

function getApiUrl() {
  const apiUrl = process.env.NEXT_PUBLIC_API_SITE_URL ?? ""
  return `${apiUrl}/api`
}

function getGA4Id() {
  return process.env.NEXT_PUBLIC_GA_4_ID ?? ""
}

function getCanonical(relativeUrl: string) {
  const url = getUrl()
  if (url.startsWith(defaultUrl)) return {}
  else {
    return {
      canonical: `${defaultUrl}${
        relativeUrl.startsWith("/") ? "" : "/"
      }${relativeUrl}`,
    }
  }
}

const site = {
  url: getUrl(),
  apiUrl: getApiUrl(),
  ga4Id: getGA4Id(),
  generateCanonical: (relativeUrl: string) => getCanonical(relativeUrl),
  defaultUrl,
}

export { site, getUrl, getApiUrl, getGA4Id }
