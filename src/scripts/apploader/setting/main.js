require.config({
    baseUrl: '/cache/js/apploader/setting/controller',
    paths: {
      'angular': '/cache/public/js/angular/angular.min',
      'angularAMD': '/cache/public/js/angular/angularAMD.min',
		  'angular-animate': '/cache/public/js/angular/angular-animate.min',
		  'angular-sanitize': '/cache/public/js/angular/angular-sanitize.min',
      'angular-route': '/cache/public/js/angular/angular-route.min',
      'ui-bootstrap-custom': '/cache/public/js/angular/ui-bootstrap-custom-0.12.0.min',
      'ui-bootstrap-custom-tpls': '/cache/public/js/angular/ui-bootstrap-custom-tpls-0.12.0.min',
      'jquery': '/cache/public/js/jquery/jquery.min',
      'lodash': '/cache/public/js/lodash/lodash.min',
      'tutorial': '../tutorial/setting_tut',
      'btnfunc': '../common/button-func',
      'modalInstance': '../common/ModalInstanceCtrl',
      'ngload': '/cache/public/js/requirejs/ngload',
      'app': '../app'
    },
	shim: { 'angularAMD': ['angular'],
			'angular-route': ['angular'],
			'angular-animate': ['angular'],
			'angular-sanitize': ['angular'],
			'ui-bootstrap-custom': ['angular'],
			'ui-bootstrap-custom-tpls': ['angular','ui-bootstrap-custom']
			},
	deps:['app']
});
