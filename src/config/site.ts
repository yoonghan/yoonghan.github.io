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
  if (url === defaultUrl) return {}
  else {
    return {
      canonical: `${defaultUrl}${
        relativeUrl.replaceAll(" ", "").startsWith("/") ? "" : "/"
      }${relativeUrl}`,
    }
  }
}

//This url is cyclic, as in this api/cron must exists before the site can use it. This url is to check last cron updated when "build" is made
const cronApiUrl = "https://www.walcron.com/api/cron?action=today"

const site = {
  url: getUrl(),
  apiUrl: getApiUrl(),
  ga4Id: getGA4Id(),
  cronApiUrl,
  generateCanonical: (relativeUrl: string) => getCanonical(relativeUrl),
  defaultUrl,
}

export { site, getUrl, getApiUrl, getGA4Id }
