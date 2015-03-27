require.config({
    baseUrl: '/cache/js/apploader/admin/controller',
    paths: {
        'angular': '../../../lib/angular/angular.min',
        'angularAMD': '../../../lib/angular/angularAMD.min',
		'angular-animate': '../../../lib/angular/angular-animate.min',
		'angular-aria': '../../../lib/angular/angular-aria.min',
		'angular-material': '../../../lib/angular/angular-material.min',
		'angular-messages': '../../../lib/angular/angular-messages.min',
        'angular-route': '../../../lib/angular/angular-route.min',
		'ui-bootstrap-custom': '../../../lib/angular/ui-bootstrap-custom-0.12.0.min',
		'ui-bootstrap-custom-tpls': '../../../lib/angular/ui-bootstrap-custom-tpls-0.12.0.min',
		'reactjs':'../../../lib/reactjs/react.min',
		'ng-flow': '../../../lib/ng-flow/ng-flow-standalone.min',
        'moment': '../../../lib/moment/moment.min',
        'ngload': '../../../lib/requirejs/ngload',
        'calendar-filter': '../filter/calendar-filter',
        'reactloader': '../react/app-react',
        'app': '../app'
    },
	shim: { 'angularAMD': ['angular'],
			'angular-route': ['angular'],
			'angular-animate': ['angular'],
			'angular-aria': ['angular'],
			'angular-material': ['angular'],
			'angular-messages': ['angular'],
			'ng-flow': ['angular'],
			'reactloader' : ['reactjs'],
			'ui-bootstrap-custom': ['angular'],
			'ui-bootstrap-custom-tpls': ['angular','ui-bootstrap-custom']
			},
	deps:['app']
});