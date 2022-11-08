const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
})

module.exports = withBundleAnalyzer({
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    config.module.noParse = [require.resolve("typescript/lib/typescript.js")]
    return config
  },
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
})
