const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const configuration = withBundleAnalyzer({
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.node = {
        fs: 'empty',
        module: 'empty'
      }
    }
    return config;
  },
  env: {
    PUSHER_APP_ID: process.env.PUSHER_APP_ID||"PUSHER_APP_ID",
    PUSHER_APP_KEY: process.env.PUSHER_APP_KEY||"PUSHER_APP_KEY",
    PUSHER_SECRET: process.env.PUSHER_SECRET||"PUSHER_SECRET",
    PUSHER_CLUSTER: process.env.PUSHER_CLUSTER||"PUSHER_CLUSTER"
  }
});

module.exports = configuration;
