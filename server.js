const express = require('express'),
      helmet = require('helmet'),
      hsts = require('hsts'),
      next = require('next');

const hostApp = require('./hostApp');

const dev = process.env.NODE_ENV !== 'production';
const port = parseInt(process.env.PORT, 10) || 8001;
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare()
.then(() => {
  const server = express();

  /** [Security-Start]**/
  server.use(helmet());
  server.use(hsts({
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }));
  /** [Security-End] **/

  /** [SEO-Start] **/
  const seoOptions = {
    root: __dirname + '/seo/',
    headers: {
      'Content-Type': 'text/plain;charset=UTF-8',
    }
  };
  server.get('/robots.txt', (req, res) => (
    res.status(200).sendFile('robots.txt', seoOptions)
  ));
  server.get('/sitemap.xml', (req, res) => {
    seoOptions["headers"] = {"Content-Type": "application/xhtml+xml;charset=UTF-8"}
    return res.status(200).sendFile('sitemap.xml', seoOptions)
  });
  server.get('/og_image.png', (req, res) => {
    seoOptions["headers"] = {"Content-Type": "image/png"}
    return res.status(200).sendFile('og_image.png', seoOptions)
  });
  server.get('/favicon.ico', (req, res) => {
    seoOptions["headers"] = {"Content-Type": "image/x-icon"}
    return res.status(200).sendFile('favicon.ico', seoOptions)
  });
  /** [SEO-End] **/

  /** [Static-Start] **/
  server.use(express.static('./static', {
    maxage: '24h'
  }));
  /** [Static-End] **/

  /** [SiteHosting-Start] **/
  server.use('/host', express.static('./host', {
    maxage: '24h'
  }));
  /** [SiteHosting-End] **/

  /** [Allow External Hosting-Start] **/
  hostApp(server);
  /** [Allow External Hosting-End]**/

  /** [Request-Start]**/
  server.get('*', (req, res) => {
    return handle(req, res);
  });
  /** [Request-Start]**/

  /** [Listener-Start]**/
  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`Ready on http://localhost: ${port}`);
  });
  /** [Listener-Start]**/
})
.catch((ex) => {
  console.error(ex.stack);
  process.exit(1);
});
