'use strict';

var pkg = require('./package.json'),
  gulp = require('gulp'),
  gutil = require('gulp-util'),
  plumber = require('gulp-plumber'),
  connect = require('gulp-connect'),
  server = require('gulp-express'),
  pug = require('gulp-pug'),
  sass = require('gulp-sass'),
  cachebust = require('gulp-cache-bust'),
  runSequence = require('run-sequence'),
  del = require('del'),
  opn = require('opn'),
  through = require('through'),
  webpack = require('webpack-stream'),
  isDist = process.argv.indexOf('default') === -1 && process.argv.indexOf('serve') === -1;

/*
 *
 * WEBPACK converstion functionality
 *
 */
var webpack_func = function(loc) {
  const location = loc;
  const webpack_location = (location === '' ? '.' : './src/' + location)
  return function() {
    return gulp.src('src/' + location + '/js/*.tsx')
      .pipe(isDist ? through() : plumber())
      .pipe(webpack(require(webpack_location + '/webpack.config.js')))
      .pipe(gulp.dest('dist/' + location + '/ext/js/'))
      .pipe(connect.reload());
  }
};
gulp.task('webpack:html', ['clean:js'], webpack_func(''));
gulp.task('webpack:patternlibrary', webpack_func('patternlibrary'));
gulp.task('webpack', ['webpack:html', 'webpack:patternlibrary']);

/*
 *
 * PUG converstion functionality
 *
 */
var pug_func =  function(loc) {
  const location = loc;
  const dest_location = (location==='html' ? '' : location);
  return function() {
    return gulp.src('src/' + location + '/**/*.pug')
      .pipe(isDist ? through() : plumber())
      .pipe(pug({ pretty: !isDist }))
      .pipe(gulp.dest('dist/' + dest_location))
      .pipe(connect.reload());
  };
};
gulp.task('pug:html', pug_func('html'));
gulp.task('pug:patternlibrary', pug_func('patternlibrary'));
gulp.task('pug', ['pug:html', 'pug:patternlibrary']);

/*
 *
 * IMAGE COPIER
 *
 */
var image_func = function(loc) {
  const location = loc;
  return function() {
    return gulp.src(['./src/' + location + '/img/**/*'])
      .pipe(gulp.dest('dist/' + location + '/ext/img'))
      .pipe(connect.reload());
  };
};
gulp.task('image:html', image_func(''));
gulp.task('image:patternlibrary', image_func('patternlibrary'));
gulp.task('image', ['image:html', 'image:patternlibrary']);

//Basic file copy
gulp.task('copy:basic', function () {
    return gulp.src(['./src/**/lib/**']).pipe(gulp.dest('dist/ext/'));
});
gulp.task('copy:favicon', function () {
    return gulp.src(['./src/favicon.ico']).pipe(gulp.dest('dist/'));
});
gulp.task('copy', ['copy:basic', 'copy:favicon']);

//Cache Busting for production release
gulp.task('cachebust', function () {
  return gulp.src('./dist/*.html')
    .pipe(cachebust({
      type: 'timestamp'
    }))
    .pipe(gulp.dest('./dist'));
});

//Task connection
gulp.task('connect', function() {
  connect.server({
    root: 'dist/',
    livereload: true
  });
});
gulp.task('connect-server', function() {
  server.run(['start.js']);
});
gulp.task('open', ['connect-server', 'connect'], function (done) {
  opn('http://localhost:8000', done);
});

//Task Cleaning
gulp.task('clean', function(done) {
  return del('dist', done);
});

gulp.task('clean:js', function(done) {
  return del('dist/ext/js/*.js', done);
});

gulp.task('clean:images', function(done) {

  return del('dist/cache/images', done);
});

//Task Watcher
gulp.task('watch', function() {
  gulp.watch('src/js/**/*.tsx', ['webpack:html']);
  gulp.watch('src/css/**/*.scss', ['webpack:html']);
  gulp.watch('src/patternlibrary/**/*.tsx', ['webpack:patternlibrary']);
  gulp.watch('src/patternlibrary/**/*.scss', ['webpack:patternlibrary']);
  gulp.watch('src/**/*.pug', ['pug']);
  gulp.watch('src/img/', ['image:html']);
  gulp.watch('src/patternlibrary/img/', ['image:patternlibrary']);
});

//Task open to public
gulp.task('build', function(callback) {runSequence('clean', 'copy', 'image', 'pug', 'cachebust', 'webpack', callback)});
gulp.task('serve', function(callback) {runSequence('build', 'open', 'watch')});
gulp.task('default', ['serve']);
