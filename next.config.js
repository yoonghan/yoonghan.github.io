// const withBundleAnalyzer = require("@next/bundle-analyzer")({
//   enabled: true,
// })

const withPWA = require("@ducanh2912/next-pwa").default({
  disable: process.env.NODE_ENV === "development",
  register: false,
  dest: "public",
})

module.exports = withPWA(require("./extended.next.config.js"))
