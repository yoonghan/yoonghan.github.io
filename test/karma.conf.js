module.exports = function(config){
  config.set({

    basePath : '../',

    files : [
      '/cache/js/angular/angular.min.js',
	  '/cache/js/angular/angular-sanitize.min.js',
	  '/cache/js/angular/ui-bootstrap-0.11.2.min.js',
	  '/cache/js/angular/ui-bootstrap-custom-tpls-0.10.0.min.js',
	  'test/js/angular-resource/angular-resource.js',
      'test/js/angular/angular-mocks.js',
     // 'webroot/cache/js/webby/*.js',
      '/cache/js/apploader/*.js',
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
