const images = {
  remotePatterns: [
    new URL("https://d1.awsstatic.com/certification/badges/**"),
    new URL(
      "https://d1.awsstatic.com/training-and-certification/certification-badges/**",
    ),
    new URL("https://images.credly.com/size/**"),
    new URL(
      "https://coursera-university-assets.s3.amazonaws.com/73/8792b24ae547c1a582c33f7ea4d569/Microsoft-logo_rgb_200x43.png?auto=format%2Ccompress&dpr=2&h=45",
    ),
    new URL(
      "https://coursera-university-assets.s3.amazonaws.com/4a/cb36835ae3421187080898a7ecc11d/Google-G_360x360.png?auto=format%2Ccompress&dpr=2&w=60&h=60",
    ),
    new URL(
      "https://images.credly.com/images/bfbfeb07-49b9-4cce-866c-f06ef9e2aae9/f9681bc8-450d-40fd-81c4-a3a20e483c0b.png",
    ),
  ],
}

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
  disable: process.env.NODE_ENV === "development",
  register: false,
  dest: "public",
  publicExcludes: ["!**/*.mp4", "!**/*.mp3", "!**/*.png"],
})

module.exports = withPWA({
  //placeholder_for_static_generation
  images,
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
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        // Disable the 'tls' module on the client side
        tls: false,
      }
    }
    return config
  },
})
