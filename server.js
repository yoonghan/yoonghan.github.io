#!/bin/env node
//  OpenShift sample Node application
var express   		= require('express');
var fs        		= require('fs');
var mime	  		= require('mime/mime.js');
var replacer		= require('replacer/textreplacer.js');

/**
 *  Define the sample application.
 */
var SampleApp = function() {
	// Default folder
	var webroot = "./webroot/";
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
        self.ipaddress = process.env.OPENSHIFT_NODEJS_IP;
        self.port      = process.env.OPENSHIFT_NODEJS_PORT || 8000;

        if (typeof self.ipaddress === "undefined") {
            //  Log errors on OpenShift but continue w/ 127.0.0.1 - this
            //  allows us to run/test the app locally.
            console.warn('No OPENSHIFT_NODEJS_IP var, using 127.0.0.1');
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
			
			cache = self.replaceText(path, cache);
			
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
	}


    /**
     *  terminator === the termination handler
     *  Terminate server on receipt of the specified signal.
     *  @param {string} sig  Signal to terminate on.
     */
    self.terminator = function(sig){
        if (typeof sig === "string") {
           console.log('%s: Received %s - terminating sample app ...',
                       Date(Date.now()), sig);
           process.exit(1);
        }
        console.log('%s: Node server stopped.', Date(Date.now()) );
    };


    /**
     *  Setup termination handlers (for exit and a list of signals).
     */
    self.setupTerminationHandlers = function(){
        //  Process on exit and signals.
        process.on('exit', function() { self.terminator(); });

        // Removed 'SIGPIPE' from the list - bugz 852598.
        ['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT',
         'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM'
        ].forEach(function(element, index, array) {
            process.on(element, function() { self.terminator(element); });
        });
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

		self.routes['/favicon.ico'] = function(req, res) {
			res.setHeader( CONTENT_TYPE,  mime(".ico"));
			res.send(fs.readFileSync(webroot+'/favicon.ico'));
		};
		
		self.routes['/selfservice/admin'] = function(req, res) {
			
			var reqPath = self.replacePath(req.path.toString());
			
			res.setHeader(CONTENT_TYPE, mime(".html"));
			res.send(self.cache_get(reqPath + "/index.html"));
		};
		
		self.routes['/selfservice/*:path'] = function(req, res) {
			
			var reqPath = self.replacePath(req.path.toString());
			
			res.setHeader(CONTENT_TYPE, mime(".html"));
			res.send(self.cache_get(reqPath + ".html"));
		};
		
		self.routes['/webby/*:path'] = function(req, res) {
			
			var reqPath = self.replacePath(req.path.toString());
			
			res.setHeader(CONTENT_TYPE, mime(".html"));
			res.send(self.cache_get(reqPath + "/index.html"));
		};
		
		self.routes['/errors/*:path'] = function(req, res) {
			
			var reqPath = self.replacePath(req.path.toString());
			
			res.setHeader(CONTENT_TYPE, mime(".html"));
			res.send(self.cache_get(reqPath + ".html"));
		};
		

		self.routes['/cache/json/*:path'] = function(req, res) {
			var reqPath = self.replacePath(req.path.toString());
			
			var header = {};
			header[CONTENT_TYPE] = mime(".json");
			header[ALLOW_ACCESS_ORIGIN] = '*';
			header[CACHE_CONTROL] = 'no-transform,public,max-age=3600,s-maxage=3600';
			
			res.set(header);
			res.send(fs.readFileSync(reqPath));
		};

		self.routes['/cache/*:path'] = function(req, res) {

			var reqPath = self.replacePath(req.path.toString());
			var header = {};
			header[CONTENT_TYPE] = mime(reqPath);
			header[CACHE_CONTROL] = 'no-transform,public,max-age=3600,s-maxage=3600';

			res.set(header);
			res.send(fs.readFileSync(reqPath));
		};
		
		self.routes['/swagger/*:path'] = function(req, res) {
			var reqPath = self.replacePath(req.path.toString());
			
			var header = {};
			header[CONTENT_TYPE] = mime(reqPath);
			header[ALLOW_ACCESS_ORIGIN] = '*';
			res.set(header);
			res.send(self.cache_get(reqPath));
		};
		
        self.routes['/'] = function(req, res) {
            res.setHeader("Content-Type" , mime(".html"));
            res.send( self.cache_get(webroot + 'webby/index.html') );
        };
    };
	
	self.replacePath = function(path){
		path = webroot + path
		return path.replace(/\/\//g, "/").replace(/\.\./g, "/");
	}
	
	/**
	 * Determine content-type to send.
	**/
//	self.checkfileHeader = function(val){
//		var ext = val.substring(val.lastIndexOf("."), val.length)
//		
//		switch(ext){
//			case ".css":
//				return 'text/css';
//			case ".jpg": case ".jpeg":
//				return 'image/jpeg';
//			case ".gif":
//				return 'image/gif';
//			case ".js":
//				return "application/javascript";
//			case ".svg":
//				return "image/svg+xml";
//			case ".ico":
//				return "image/x-icon";
//			case ".png":
//				return "image/png";
//			case ".json":
//				return "application/json";
//			case ".html":
//				return "text/html";
//			case ".woff":
//				return "application/x-font-woff";
//			default:
//				return "application/stream";
//		}
//	}

    /**
     *  Initialize the server (express) and create the routes and register
     *  the handlers.
     */
    self.initializeServer = function() {
        self.createRoutes();
        self.app = express();

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
        self.setupTerminationHandlers();

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
var zapp = new SampleApp();
zapp.initialize();
zapp.start();

