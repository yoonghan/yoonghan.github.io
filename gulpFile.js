'use strict';

var pkg = require('./package.json'),
  gulp = require('gulp'),
  gutil = require('gulp-util'),
  plumber = require('gulp-plumber'),
  connect = require('gulp-connect'),
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
    return gulp.src('src'+location+'/scripts/**.js')
      .pipe(isDist ? through() : plumber())
      .pipe(through())
      .pipe(gulp.dest('dist'+location+'/js'))
      .pipe(connect.reload());
  };
};
gulp.task('js', [], vanillajs('/patternlibrary'));
gulp.task('js-main', [], vanillajs('/'));

//Basic file copy
gulp.task('copy', [], function () {
    return gulp.src(['./src/public/**/*'], {
        base: 'src'
    }).pipe(gulp.dest('dist'));
});

//Type scripting - Module Type
var typescript = function(location) {
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
      .pipe(gulp.dest('dist'+location+'/js'));
  };
};
gulp.task('typescript', [], typescript('/patternlibrary'));
gulp.task('typescript-main', [], typescript('/'));


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
gulp.task('html', [], html('/patternlibrary'));
gulp.task('html-main', [], html('/'));

//SASS
var css = function(location) {
  return function(){
    return gulp.src('src'+location+'/styles/*.scss')
      .pipe(isDist ? through() : plumber())
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('dist'+location+'/css'))
      .pipe(connect.reload());
  };
};
gulp.task('css', [], css('/patternlibrary'));
gulp.task('css-main', [], css('/'));

//Images
gulp.task('images', ['clean:images'], function() {
  return gulp.src(['./src/images/**/*'])
    .pipe(gulp.dest('dist/images'))
    .pipe(connect.reload());
});

gulp.task('clean', function(done) {
  return del('dist', done);
});

gulp.task('clean:html', function(done) {
  return del('dist'+location+'/index.html', done);
});

gulp.task('clean:js', function(done) {
  return del('dist'+location+'/js/*.js', done);
});

gulp.task('clean:css', function(done) {
  return del('dist'+location+'/css/*.css', done);
});

gulp.task('clean:images', function(done) {
  return del('dist/images', done);
});

gulp.task('clean:typescript', function(done) {
  return del('dist'+location+'/js', done);
});

gulp.task('connect', function() {
  connect.server({
    root: 'dist',
    livereload: true
  });
});

gulp.task('open', ['connect'], function (done) {
  opn('http://localhost:8080', done);
});

gulp.task('watch', function() {
  gulp.watch('src/**/images', ['images']);
  gulp.watch('src/**/*.jade', ['html-main']);
  gulp.watch('src/styles/**/*.scss', ['css-main']);
  gulp.watch('src/scripts/**/*.js', ['js-main']);
  gulp.watch('src/scripts/**/*.ts', ['typescript-main']);
  gulp.watch('src/patternlibrary/**/*.jade', ['html']);
  gulp.watch('src/patternlibrary/styles/**/*.scss', ['css']);
  gulp.watch('src/patternlibrary/scripts/**/*.js', ['js']);
  gulp.watch('src/patternlibrary/scripts/**/*.ts', ['typescript']);
});

gulp.task('deploy', ['build'], function(done) {
  ghpages.publish(path.join(__dirname, 'dist'), { logger: gutil.log }, done);
});

gulp.task('build-dev', function(callback) {runSequence('build', 'css', 'js', callback)});

gulp.task('build', function(callback) {runSequence('clean', 'copy', 'js-main', 'css-main', 'typescript-main', 'html-main', 'svgstore', 'images', callback)});

gulp.task('serve', function(callback) {runSequence('build-dev', 'open', 'watch')});

gulp.task('default', ['serve']);
