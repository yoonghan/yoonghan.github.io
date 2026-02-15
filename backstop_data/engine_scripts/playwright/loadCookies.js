const fs = require("fs")

module.exports = async (browserContext, scenario) => {
  let cookies = []
  const cookiePath = scenario.cookiePath
  const cookieDomain = scenario.cookieDomain

  // Read Cookies from File, if exists
  if (cookiePath && fs.existsSync(cookiePath)) {
    cookies = JSON.parse(fs.readFileSync(cookiePath))
  }

  // Replace with cookie with domain
  cookies = cookies.map((cookie) => ({ ...cookie, domain: cookieDomain }))

  // Add cookies to browser
  browserContext.addCookies(cookies)

  console.log("Cookie state restored with:", JSON.stringify(cookies, null, 2))
}
