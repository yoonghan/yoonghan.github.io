const express = require('express'),
      helmet = require('helmet'),
      hsts = require('hsts'),
      next = require('next');


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
  server.use(express.static('./seo'));
  /** [SEO-End] **/

  /** [Static-Start] **/
  server.use(express.static('./static'));
  /** [Static-End] **/

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
