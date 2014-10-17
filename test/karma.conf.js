module.exports = function(config){
  config.set({

    basePath : '../',

    files : [
      'webroot/cache/js/angular/angular.min.js',
	  'webroot/cache/js/angular/angular-sanitize.min.js',
	  'test/js/angular-resource/angular-resource.js',
      'test/js/angular/angular-mocks.js',
      'webroot/cache/js/webby/*.js',
      'test/unit/**/*.js'
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
            'karma-chrome-launcher',
            'karma-jasmine'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};