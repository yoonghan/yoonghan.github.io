const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
})

const withPWA = require("next-pwa")({
  disable: process.env.NODE_ENV === "development",
  dest: "public",
  register: false,
})

module.exports = withBundleAnalyzer(
  withPWA({
    i18n: {
      locales: ["en"],
      defaultLocale: "en",
    },
  })
)
