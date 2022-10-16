module.exports = {
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    config.module.noParse = [require.resolve("typescript/lib/typescript.js")]
    return config
  },
}
