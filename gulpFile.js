'use strict';

var gulp = require('gulp'),
  gulpUtil = require('gulp-util'),
  gulpSequence = require('gulp-sequence'),
  pug = require('gulp-pug-i18n'),
  plumber = require('gulp-plumber'),
  through = require('through'),
  del = require('del'),
  opn = require('opn'),
  webpack = require('webpack'),
  webpackConfig = require("./webpack.config.js"),
  webpackDevServer = require("webpack-dev-server"),
  cachebust = require('gulp-cache-bust'),
  swPrecache = require('sw-precache');

var dev = "main";

/*
 * Web precaching/progressive app
 */
gulp.task('serviceworker:build', function(callback) {
 var rootDir = './dist/main';

 swPrecache.write(`${rootDir}/service-worker.js`, {
   staticFileGlobs: [rootDir + '/**/*.{js,html,css,png,jpg,gif,svg,eot,ttf,woff,woff2}'],
   stripPrefix: rootDir
 }, callback);
});

/**
 * Webpack for production bundle
 **/
gulp.task("webpack:build", function() {
	var myConfig = Object.create(webpackConfig);

  myConfig.plugins = myConfig.plugins.concat (
    new webpack.DefinePlugin({
      "process.env": {
        //Reduction for React
        "NODE_ENV": JSON.stringify("production")
      }
    }),
    new webpack.optimize.UglifyJsPlugin()
  );

  webpack(myConfig, function(err, stats) {
		if(err) throw new gulpUtil.PluginError("webpack:build", err);
		gulpUtil.log("[webpack:build]", stats.toString({
			colors: true
		}));
	});
});

/**
 * Webpack for development
 **/
var webpackFunc =  function(loc) {
  var myConfig = (loc === 'html') ? Object.create(webpackConfig) : Object.create(require("./src/patternlibrary/webpack.config.js"));
  var contentBasePath = (loc === 'html') ? "main" : loc;
  var port = (loc === 'html') ? 8080: 8081;

  var compiler = webpack(myConfig);
  new webpackDevServer(compiler, {
    publicPath: myConfig.output.publicPath,
    contentBase: "dist/" + contentBasePath + "/",
    hot: true,
    stats: {
      colors: true
    }
  }).listen(port, "localhost", function(err) {
      if(err) throw new gulpUtil.PluginError("webpack-dev-server", err);
      gulpUtil.log("[webpack-dev-server]", "DEVELOPMENT: http://localhost:" + port + "/webpack-dev-server/index.html");
  });
};
gulp.task('webpack-dev-server:html', function(){webpackFunc('html')});
gulp.task('webpack-dev-server:patternlibrary', function(){webpackFunc('patternlibrary')});
gulp.task('webpack-dev-server', ['webpack-dev-server:html', 'webpack-dev-server:patternlibrary']);

/**
 * Pug to HTML converstion functionality
 **/
var pugFunc =  function(loc) {
  const location = loc;
  const dest_location = (location==='html' ? 'main' : location);
  return function() {
    return gulp.src('src/' + location + '/**/*.pug')
      .pipe(through())
      .pipe(pug({
        i18n: {
          default: 'en',
          locales: 'src/locale/*',
          filename: '{{{lang}}/}{{basename}}.html'
        }
      }))
      .pipe(gulp.dest('dist/' + dest_location));
  };
};
gulp.task('pug:html', pugFunc('html'));
gulp.task('pug:patternlibrary', pugFunc('patternlibrary'));
gulp.task('pug', ['pug:html', 'pug:patternlibrary']);

/**
 * Add cache buster, so that the cache are rewritten
 **/
 gulp.task('bustCache', function () {
   return gulp.src('./dist/**/*.html')
    .pipe(through())
    .pipe(cachebust({
        type: 'timestamp'
    }))
    .pipe(gulp.dest('./dist'));
 });

/**
 * Copy Images
 **/
var image_func = function(loc) {
  const location = loc;
  const func = (location === 'html' ?
    (
      function() {
        return gulp.src(['./src/img/**/*'])
          .pipe(gulp.dest('dist/main/ext/img'));
      }
    )
    :
    (
      function() {
        return gulp.src(['./src/' + loc + '/img/**/*'])
          .pipe(gulp.dest('dist/main/ext/img'))
          .pipe(gulp.dest('dist/' + loc + '/ext/img'));
      }
    )
  );
  return func;
};
gulp.task('image:html', image_func('html'));
gulp.task('image:patternlibrary', image_func('patternlibrary'));
gulp.task('image', ['image:html', 'image:patternlibrary']);

/**
 * Basic file copy
 **/
 gulp.task('copy:patternlibcss', function () {
     return gulp.src(['./src/lib/css/**']).pipe(gulp.dest('dist/patternlibrary/ext/css'));
 });
gulp.task('copy:basic', function () {
    return gulp.src(['./src/lib/**']).pipe(gulp.dest('dist/main/ext/'));
});
gulp.task('copy:favicon', function () {
    return gulp.src(['./src/favicon.ico']).pipe(gulp.dest('dist/main/'));
});
gulp.task('copy:robots', function () {
    return gulp.src(['./src/robots.txt']).pipe(gulp.dest('dist/main/'));
});
gulp.task('copy:wellknowninfo', function () {
    return gulp.src(['./src/.well-known/*']).pipe(gulp.dest('dist/main/.well-known/'));
});
gulp.task('copy', ['copy:basic', 'copy:patternlibcss', 'copy:favicon', 'copy:robots', 'copy:wellknowninfo']);

/**
 * Clean directory
 **/
gulp.task('clean', function() {
  return del('dist');
});
gulp.task('clean:js', function() {
  return del('dist/ext/js/*.js');
});
gulp.task('clean:images', function() {
  return del('dist/cache/images');
});

/**
 * Task Watcher
 **/
gulp.task('watch', function() {
  gulp.watch('src/**/*.pug', ['pug']);
  gulp.watch('src/img/', ['image:html']);
  gulp.watch('src/patternlibrary/img/', ['image:patternlibrary']);
});

/**
 * Build scripts
 **/
gulp.task('build-basic', gulpSequence('clean', ['pug', 'copy', 'image']));
gulp.task('build-prod', gulpSequence('build-basic', 'webpack:build', 'serviceworker:build', 'bustCache'))
gulp.task('build-dev-progressive', gulpSequence('build-dev', 'webpack:build', 'serviceworker:build'));
gulp.task('build-dev', gulpSequence('build-basic', ['webpack-dev-server', 'watch']));
gulp.task('default', ['build-dev']);
