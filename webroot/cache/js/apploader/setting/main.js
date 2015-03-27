require.config({
    baseUrl: '/cache/js/apploader/setting/controller',
    paths: {
        'angular': '../../../lib/angular/angular.min',
        'angularAMD': '../../../lib/angular/angularAMD.min',
		'angular-animate': '../../../lib/angular/angular-animate.min',
		'angular-sanitize': '../../../lib/angular/angular-sanitize.min',
        'angular-route': '../../../lib/angular/angular-route.min',
        'ui-bootstrap-custom': '../../../lib/angular/ui-bootstrap-custom-0.12.0.min',
        'ui-bootstrap-custom-tpls': '../../../lib/angular/ui-bootstrap-custom-tpls-0.12.0.min',
        'jquery': '../../../lib/jquery/jquery.min',
        'lodash': '../../../lib/lodash/lodash.min',
        'tutorial': '../tutorial/setting_tut',
        'btnfunc': '../common/button-func',
        'modalInstance': '../common/ModalInstanceCtrl',
        'ngload': '../../../lib/requirejs/ngload',
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