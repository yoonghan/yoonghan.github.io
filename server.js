#!/bin/env node
//  OpenShift sample Node application
var express = require('express'),
  fs        = require('fs'),
  mime      = require('./util/mime/mime.js'),
  env       = process.env;

/**
 *  Define the sample application.
 */
var NodeApp = function() {
  // Default folder
  const WEBROOT = "./dist/",
  // Default language
    DEFAULT_LANGUAGE = "en",
    DEFAULT_LANGUAGE_REGEX = new RegExp("\\/"+ DEFAULT_LANGUAGE +"\\/|\\/"+ DEFAULT_LANGUAGE +"$"),
  //  Scope.
    self = this;
  //Define test environment
    var testEnv = false;


  /*  ================================================================  */
  /*  Helper functions.                                                 */
  /*  ================================================================  */

  /**
   *  Set up server IP address and port # using env variables/defaults.
   */
  self.setupVariables = function() {
    const PORT = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8000;
    var ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';
    //  Set the environment variables we need.
    if(PORT === 8000) {
      testEnv = true;
      ip = 'localhost';
      console.warn('Executing local environment run');
    }
    self.ipaddress = ip;
    self.port      = PORT;
  };

  /**
   *  Populate the cache.
   */
  self.populateCache = function() {
      if (typeof self.zcache === "undefined") {
          self.zcache = { };
      }
  };

  /**
   * Enable HTTPS only
   **/
  self.redirectSec = function(req, res, next) {
    console.log('https://' + req.headers.host + req.path);
    if (req.headers['x-forwarded-proto'] == 'http') {
        res.redirect('https://' + req.headers.host + req.path);
    } else {
        return next();
    }
  };

  /**
   *  Retrieve entry (content) from cache.
   *  Only test environment is not cached.
   *  @param {string} key  Key identifying content to retrieve from cache.
   */
  self.sendContentWithCacheHandler = function(path, useragent, res) {
    var cache = self.zcache[path];
    if(!cache || testEnv) {
      try {
        cache = fs.readFileSync(WEBROOT + path);
        self.zcache[path] = cache;
        res.send(cache);
      }
      catch(e) {
        console.log("IOException >> ua: "+useragent+", err: "+e);
        self.showErrorPage(path, res);
      }
    }
    else {
      res.send(cache);
    }
  };

  /**
   * Redirect if page is not found, else displays an error page.
   **/
  self.showErrorPage = function(path, res) {
    var localeObj = self.getLocaleAndRedirect(path, ""),
      errorpage = "error.html";
    if(localeObj.locale != "" && localeObj.locale !== DEFAULT_LANGUAGE && !localeObj.shouldRedirect) {
        errorpage = localeObj.locale + "/error.html";
    }

    try {
      const binary = fs.readFileSync(WEBROOT + errorpage);
      res.send(binary);
    }
    catch(e) {
      //Redirect to main page to handle non-such locale, expectation is that user has it's own error page.
      self.redirectWithInfinityPrevention(res, "/");
    }
  };

  /**
   * Prevent page to have and infinite loop or redirects.
   **/
  self.redirectWithInfinityPrevention = function(res, pathToRedirect, referer = "none") {
    if(referer.lastIndexOf(pathToRedirect) === referer.length - pathToRedirect.length) {
      self.sendContentWithCacheHandler('index.html', "", res);
    }
    else {
      res.redirect(pathToRedirect);
    }
  }

  /*  ================================================================  */
  /*  App server functions (main app logic here).                       */
  /*  ================================================================  */

  /**
   *  Create the routing table entries + handlers for the application.
   */
  self.createRoutes = function() {
    const CONTENT_TYPE='Content-Type',
      CACHE_CONTROL='Cache-Control',
      CACHE_INFO    = 'no-transform,public,max-age=86400,s-maxage=86400',
      ALLOW_ACCESS_ORIGIN = 'Access-Control-Allow-Origin',
      USER_AGENT = 'user-agent',
      REFERER = 'referer';

    const indexRoute = function(req, res) {
      res.setHeader(CONTENT_TYPE, "text/html");
      self.sendContentWithCacheHandler('index.html', req.headers[USER_AGENT], res);
    };

    const libraryRoute = function(req, res, path) {
      var reqPath = self.replacePath(WEBROOT + path);
      var resource = fs.readFileSync(reqPath);
      var header = {};
      header[CONTENT_TYPE] = mime(reqPath);
      header[CACHE_CONTROL] = CACHE_INFO;
      res.set(header);
      res.send(resource);
    };

    const robotsRoute = function(req, res) {
      res.setHeader(CONTENT_TYPE, "text/plain");
      self.sendContentWithCacheHandler('robots.txt', req.headers[USER_AGENT], res);
    };

    //Created to handle iOS/Android app links
    //For android test with https://digitalassetlinks.googleapis.com/v1/statements:list?source.web.site=http://www.walcron.com&relation=delegate_permission/common.handle_all_urls
    const wellknownRoute = function(req, res, path) {
      res.setHeader(CONTENT_TYPE, "application/json");
      self.sendContentWithCacheHandler(path, req.headers[USER_AGENT], res);
    };

    const htmlRoute = function(req, res, path) {
      var reqPath = self.replacePath(path),
        localeObj = self.getLocaleAndRedirect(path, req.headers[REFERER]);

      res.setHeader(CONTENT_TYPE, "text/html");

      if(localeObj.locale !== '') {
        if(reqPath.endsWith('/' + localeObj.locale)) {
            reqPath = reqPath + "/index";
        }
        if(reqPath.endsWith('index.html')) {
          reqPath = reqPath.substr(0, reqPath.length-5);
        }
        reqPath = reqPath.replace(DEFAULT_LANGUAGE_REGEX, "/");
      }

      self.sendContentWithCacheHandler(reqPath + ".html", req.headers[USER_AGENT], res);
    };

    var routes = {};
    routes['/'] = function(req, res) {
      indexRoute(req, res);
    };
    routes['/index.html'] = function(req, res) {
      indexRoute(req, res);
    };
    routes['/robots.txt'] = function(req, res) {
      robotsRoute(req, res);
    };
    routes['/service-worker.js'] = function(req, res) {
      libraryRoute(req, res, 'service-worker.js');
    };
    routes['/.well-known/*:path'] = function(req, res) {
      wellknownRoute(req, res, req.path.toString());
    };
    routes['/ext/**/*:path'] = function(req, res) {
      libraryRoute(req, res, req.path.toString());
    };
    routes['/*:path'] = function(req, res) {
      if(testEnv && req.path.toString().indexOf('/patternlibrary') === 0) {
        if(req.path.toString() === '/patternlibrary' || req.path.toString() === '/patternlibrary/') {
          self.redirectWithInfinityPrevention(res, '/patternlibrary/index');
        }
        else if(req.path.toString().indexOf('/patternlibrary/ext/') === 0){
          libraryRoute(req, res, req.path.toString());
        }
        else {
          htmlRoute(req, res, req.path.toString());
        }
      }
      else {
        htmlRoute(req, res, req.path.toString());
      }

    };


    return routes;
  };

  /**
   * Sanitize the the path input.
   **/
  self.replacePath = function(path) {
    return path.replace(/\/\//g, "/").replace(/\.\./g, "/").replace(/\/$/, "");
  };

  /**
   * Retrieve both locale and check if redirection is needed.
   **/
  self.getLocaleAndRedirect = function(path, refererHeader) {
    var locale = "",
      shouldRedirect = false,
      localeFromPath = path.match(/^\/([a-z]{2})\//);

    if(localeFromPath && localeFromPath.length > 1) {
      locale = localeFromPath[1];

    }
    return {"shouldRedirect": false, "locale": locale};
    // else {
    //   const fixReferer = (refererHeader || ""),
    //     localeFromReferer = fixReferer.match(/:\/\/[a-z|0-9|\:|\.]+\/([a-z]{2})\//);
    //   if(localeFromReferer && localeFromReferer.length > 1) {
    //     locale = localeFromReferer[1];
    //     shouldRedirect = true;
    //   }
    // }
    // return {"shouldRedirect": shouldRedirect, "locale": locale};
  };

  /**
   *  Initialize the server (express) and create the routes and register
   *  the handlers.
   */
  self.initializeServer = function() {
      const routes = self.createRoutes();
      self.app = express();
      self.app.use(express.favicon(WEBROOT+'/favicon.ico', { maxAge: 2592000000 }));
      //  Add handlers for the app (from the routes).
      for (var r in routes) {
        self.app.get(r, routes[r]);
      }
  };

  /**
   *  Initializes the sample application.
   */
  self.initialize = function() {
      self.setupVariables();
      self.populateCache();
      // Create the express server and routes.
      self.initializeServer();
  };

  /**
   *  Start the server (starts up the sample application).
   */
  self.start = function() {
    //  Start the app on the specific interface (and port).
    self.app.listen(self.port, self.ipaddress, function() {
        console.log('%s: Node server started on %s:%d ...',
                    Date(Date.now() ), self.ipaddress, self.port);
    });
  };

};   /*  Sample Application.  */



/**
 *  main():  Main code.
 */
var zapp = new NodeApp();
zapp.initialize();
zapp.start();
