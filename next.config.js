const securityHeaders = [
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
]

const apiSecurityHeaders = [
  { key: "Access-Control-Allow-Credentials", value: "true" },
  {
    key: "Access-Control-Allow-Origin",
    value: process.env.CORS_ALLOW_ORIGIN || "localhost",
  },
  {
    key: "Access-Control-Allow-Methods",
    value: "GET,DELETE,PATCH,POST,PUT",
  },
  {
    key: "Access-Control-Allow-Headers",
    value:
      "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
  },
]

// const withBundleAnalyzer = require("@next/bundle-analyzer")({
//   enabled: true,
// })

const withPWA = require("@ducanh2912/next-pwa").default({
  disable: true,
  register: false,
  dest: "public",
  publicExcludes: ["!**/*.mp4", "!**/*.mp3", "!**/*.png"],
})

module.exports = withPWA({
  //placeholder_for_static_generation
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
      {
        source: "/api/:path*",
        headers: apiSecurityHeaders,
      },
    ]
  },
  experimental: { 
    instrumentationHook: true 
  }
})
