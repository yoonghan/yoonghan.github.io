#!/bin/env node
//  OpenShift sample Node application
var express   		= require('express');
var fs        		= require('fs');
var mime	  		= require('./util/mime/mime.js');
var CACHE_INFO		= 'no-transform,public,max-age=86400,s-maxage=86400';
var env          = process.env;

/**
 *  Define the sample application.
 */
var NodeApp = function() {
	// Default folder
	var webroot = "./dist/";
  //  Scope.
  var self = this;
  var testEnv = false;


  /*  ================================================================  */
  /*  Helper functions.                                                 */
  /*  ================================================================  */

  /**
   *  Set up server IP address and port # using env variables/defaults.
   */
  self.setupVariables = function() {
      //  Set the environment variables we need.
			self.ipaddress = env.NODE_IP || 'localhost';
			self.port      = env.NODE_PORT || 8000;

      if (typeof self.ipaddress === "undefined") {
          //  Log errors on OpenShift but continue w/ 127.0.0.1 - this
          //  allows us to run/test the app locally.
          console.warn('No NODE_OP var, using 127.0.0.1');
          self.ipaddress = "127.0.0.1";
          testEnv=true;
      };
  };


	/**
	 *  Populate the cache.
	 */
	self.populateCache = function() {
	    if (typeof self.zcache === "undefined") {
	        self.zcache = { 'index.html': '' };
	    }
	};

  /**
   *  Retrieve entry (content) from cache.
   *  Only test environment is not cached.
   *  @param {string} key  Key identifying content to retrieve from cache.
   */
  self.cache_get = function(path) {

		var cache = self.zcache[path];

		if(cache == undefined || testEnv){

			/**
			 * TODO: Create dynamic reading for pages and put into cache.
			 * Useful for tooltips, but never for multilingua.
			 * **/

			try{
				cache = fs.readFileSync(path);
			}catch(e){
				console.log("ERROR:-"+e)
				cache = fs.readFileSync(webroot + "error.html");
			}

			self.zcache[path] = cache
		}
		return cache;
	};

	/**
	 * Introduce dynamic text replacer in server.
	 * Cache have to be working for this, as regeneration of text replacement is painful.
	 */
	self.replaceText = function(path, buff){

		var tmp_path = path.substring(webroot.length, path.length);

		return replacer(tmp_path, buff);
	};

    /*  ================================================================  */
    /*  App server functions (main app logic here).                       */
    /*  ================================================================  */

    /**
     *  Create the routing table entries + handlers for the application.
     */
  self.createRoutes = function() {
		var CONTENT_TYPE='Content-Type';
		var CACHE_CONTROL='Cache-Control';
		var ALLOW_ACCESS_ORIGIN = 'Access-Control-Allow-Origin';
    self.routes = { };

	  self.routes['/'] = function(req, res) {
	      res.setHeader("Content-Type" , "text/html");
	      res.send( self.cache_get(webroot + 'index.html') );
	  };

		self.routes['/ext/**/*:path'] = function(req, res) {
			var reqPath = self.replacePath(req.path.toString());
			var resource = fs.readFileSync(reqPath);
			var header = {};
			header[CONTENT_TYPE] = mime(reqPath);
			header[CACHE_CONTROL] = CACHE_INFO;
			res.set(header);
			res.send(resource);
		};

		self.routes['/*:path'] = function(req, res) {

			var reqPath = self.replacePath(req.path.toString());

			res.setHeader(CONTENT_TYPE, "text/html");
			res.send(self.cache_get(reqPath + ".html"));
		};
	};

	self.replacePath = function(path){
		path = webroot + path
		return path.replace(/\/\//g, "/").replace(/\.\./g, "/").replace(/\/$/, "");
	};

  /**
   *  Initialize the server (express) and create the routes and register
   *  the handlers.
   */
  self.initializeServer = function() {
      self.createRoutes();
      self.app = express();
      self.app.use(express.favicon(webroot+'/favicon.ico', { maxAge: 2592000000 }));
      //  Add handlers for the app (from the routes).
      for (var r in self.routes) {
        self.app.get(r, self.routes[r]);
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
