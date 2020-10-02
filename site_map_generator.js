const sitemap = require('nextjs-sitemap-generator');

sitemap({
  baseUrl: 'https://www.walcron.com',
  ignoredPaths: ['admin'],
  extraPaths: ['/extraPath'],
  pagesDirectory: __dirname + "/src/pages",
  targetDirectory : __dirname + '/public',
  sitemapFilename: 'sitemap.xml',
  nextConfigPath: __dirname + "/next.config.sitemap.js",
  ignoredPaths: ["api/"],
  ignoredExtensions: [
        'png',
        'jpg',
	'mp4'
  ],
  pagesConfig: {
  },
  sitemapStylesheet: [
  ]
});

console.log(`✅ sitemap.xml generated!`);
