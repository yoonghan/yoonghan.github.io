const withOffline = require('next-offline');
const ServiceWorkerPlugin = require('service-worker-plugin');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const configuration = withBundleAnalyzer(
  withOffline(
    {
      dontAutoRegisterSw: true,
      target: 'serverless',
      transformManifest: manifest => ['/'].concat(manifest), // add the homepage to the cache
      // Trying to set NODE_ENV=production when running yarn dev causes a build-time error so we
      // turn on the SW in dev mode so that we can actually test it
      generateInDevMode: false,
      workboxOpts: {
      swDest: 'static/service-worker.js',
        runtimeCaching: [
          {
            urlPattern: /^https?.*/,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'https-calls',
              networkTimeoutSeconds: 15,
              expiration: {
                maxEntries: 150,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 1 month
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
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
        PUSHER_CLUSTER: process.env.PUSHER_CLUSTER||"PUSHER_CLUSTER",
        AUTH_API_CALL: process.env.AUTH_API_CALL||"",
        DEV_AUTH_API_CALL: process.env.DEV_AUTH_API_CALL||""
      }
    }
  )
);

module.exports = configuration;
