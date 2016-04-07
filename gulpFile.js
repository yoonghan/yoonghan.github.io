'use strict';

var pkg = require('./package.json'),
  gulp = require('gulp'),
  gutil = require('gulp-util'),
  plumber = require('gulp-plumber'),
  connect = require('gulp-connect'),
  server = require('gulp-express'),
  browserify = require('gulp-browserify'),
  jade = require('gulp-jade'),
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  csso = require('gulp-csso'),
  svgstore = require('gulp-svgstore'),
  svgmin = require('gulp-svgmin'),
  inject = require('gulp-inject'), //no longer in use
  ts = require('gulp-typescript'),
  del = require('del'),
  through = require('through'),
  opn = require('opn'),
  runSequence = require('run-sequence'),
  ghpages = require('gh-pages'),
  path = require('path'),
  isDist = process.argv.indexOf('default') === -1 && process.argv.indexOf('serve') === -1;

//SVG Control
gulp.task('svgstore', function () {
  return gulp
      .src('src/sprites/**.svg')
      .pipe(svgmin(function (file) {
        var prefix = path.basename(file.relative, path.extname(file.relative));
        return {
          plugins: [{
            cleanupIDs: {
              prefix: prefix + '-',
              minify: true
            }
          }]
        }
      }))
      .pipe(svgstore())
      .pipe(gulp.dest('src/images/sprites'));
});

//Javascript
var vanillajs = function(location) {
  return function(){
    return gulp.src('src'+location+'/scripts/apploader/**/*.js')
      .pipe(isDist ? through() : plumber())
      .pipe(through())
      .pipe(gulp.dest('dist/cache'+location+'/js'))
      .pipe(connect.reload());
  };
};
gulp.task('js', [], vanillajs('/patternlibrary'));
gulp.task('js-main', [], vanillajs('/'));

//Basic file copy
gulp.task('copy', ['copy-favicon'], function () {
    return gulp.src(['./src/public/**/*'], {
        base: 'src'
    }).pipe(gulp.dest('dist/cache'));
});

//Basic file copy
gulp.task('copy-favicon', [], function () {
    return gulp.src(['./src/favicon.ico'], {
        base: 'src'
    }).pipe(gulp.dest('dist'));
});

//Type scripting - Module Type
var typescript_amd = function(location) {
  return function(){
    var tsResult = gulp.src('src'+location+'/scripts/module/**/*.ts')
      .pipe(isDist ? through() : plumber())
      .pipe(connect.reload())
      .pipe(ts({
          noImplicitAny: false,
          module: 'AMD',
          target: 'ES5'
        }));
    return tsResult.js
      .pipe(gulp.dest('dist/cache'+location+'/js'));
  };
};

var typescript_system = function(location) {
  return function(){
    var tsResult = gulp.src('src'+location+'/scripts/system/**/*.ts')
      .pipe(isDist ? through() : plumber())
      .pipe(connect.reload())
      .pipe(ts({
          module: 'system',
          target: 'ES5',
          moduleResolution: 'node',
          sourceMap: false,
          emitDecoratorMetadata: true,
          experimentalDecorators: true,
          removeComments: false,
          noImplicitAny: false,
        }));
    return tsResult.js
      .pipe(gulp.dest('dist/cache'+location+'/js'));
  };
};

gulp.task('typescript_amd', [], typescript_amd('/patternlibrary'));
gulp.task('typescript_amd-main', [], typescript_amd('/'));

gulp.task('typescript_system', [], typescript_system('/patternlibrary'));
gulp.task('typescript_system-main', [], typescript_system('/'));

gulp.task('typescript', ['typescript_amd', 'typescript_system']);
gulp.task('typescript-main', ['typescript_amd-main', 'typescript_system-main']);

//Jade
var html = function(location) {
  return function(){
    return gulp.src('src'+location+'/**/*.jade')
      .pipe(isDist ? through() : plumber())
      .pipe(jade({ pretty: true }))
      .pipe(gulp.dest('dist'+location))
      .pipe(connect.reload());
  };
};
gulp.task('html-plain', function() {
  return gulp.src('src/site/**/*.html')
    .pipe(isDist ? through() : plumber())
    .pipe(through())
    .pipe(gulp.dest('dist/site'))
    .pipe(connect.reload());
});
gulp.task('html', [], html('/patternlibrary'));
//TO FIX: Not sure how to exclude pattern library
gulp.task('html-main', ['html-plain'], html('/'));

//SASS
var scss = function(location) {
  return function(){
    return gulp.src('src'+location+'/styles/**/*.scss')
      .pipe(isDist ? through() : plumber())
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('dist/cache'+location+'/css'))
      .pipe(connect.reload());
  };
};
gulp.task('scss', [], scss('/patternlibrary'));
gulp.task('scss-main', [], scss('/'));

//Plain CSS
var css = function(location) {
  return function(){
    return gulp.src('src'+location+'/styles/**/*.css')
      .pipe(isDist ? through() : plumber())
      .pipe(through())
      .pipe(gulp.dest('dist/cache'+location+'/css'))
      .pipe(connect.reload());
  };
};
gulp.task('css', [], css('/patternlibrary'));
gulp.task('css-main', [], css('/'));

//Images
gulp.task('images', ['clean:images'], function() {
  return gulp.src(['./src/images/**/*'])
    .pipe(gulp.dest('dist/cache/images'))
    .pipe(connect.reload());
});

//json
gulp.task('json', ['clean:json'], function() {
  return gulp.src(['./src/json/**/*'])
    .pipe(gulp.dest('dist/cache/json'))
    .pipe(connect.reload());
});

gulp.task('clean', function(done) {
  return del('dist', done);
});

gulp.task('clean:html', function(done) {
  return del('dist'+location+'/index.html', done);
});

gulp.task('clean:js', function(done) {
  return del('dist/cache'+location+'/js/*.js', done);
});

gulp.task('clean:css', function(done) {
  return del('dist/cache'+location+'/css/*.css', done);
});

gulp.task('clean:images', function(done) {
  return del('dist/cache/images', done);
});

gulp.task('clean:json', function(done) {
  return del('dist/cache/json', done);
});

gulp.task('clean:typescript', function(done) {
  return del('dist/cache'+location+'/js', done);
});

gulp.task('connect', function() {
  connect.server({
    root: 'dist',
    livereload: true
  });
});

gulp.task('connect-server', function() {
  server.run(['server.js']);
});

gulp.task('open', ['connect', 'connect-server'], function (done) {
  opn('http://localhost:8080', done);
});

gulp.task('watch', function() {
  gulp.watch('src/images', ['images']);
  gulp.watch('src/json', ['json']);
  gulp.watch('src/**/*.jade', ['html-main']);
  gulp.watch('src/styles/**/*.scss', ['scss-main']);
  gulp.watch('src/scripts/**/*.js', ['js-main']);
  gulp.watch('src/scripts/**/*.ts', ['typescript-main']);
  gulp.watch('src/patternlibrary/**/*.jade', ['html']);
  gulp.watch('src/patternlibrary/styles/**/*.scss', ['scss']);
  gulp.watch('src/patternlibrary/scripts/**/*.js', ['js']);
  gulp.watch('src/patternlibrary/scripts/**/*.ts', ['typescript']);
});

gulp.task('deploy', ['build'], function(done) {
  ghpages.publish(path.join(__dirname, 'dist'), { logger: gutil.log }, done);
});

gulp.task('build-dev', function(callback) {runSequence('build', 'scss', 'css', 'js', 'typescript', callback)});

gulp.task('build', function(callback) {runSequence('clean', 'copy', 'js-main', 'scss-main', 'css-main', 'typescript-main', 'html-main', 'svgstore', 'images', 'json', callback)});

gulp.task('serve', function(callback) {runSequence('build-dev', 'open', 'watch')});

gulp.task('default', ['serve']);
