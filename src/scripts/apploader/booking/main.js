require.config({
    baseUrl: '/cache/js/apploader/booking',
    paths: {
		'app':	'app',
		'jquery': '/cache/public/js/jquery/jquery.min',
		'lodash': '/cache/public/js/lodash/lodash.min',
    'jquery-ui': '/cache/public/js/jquery/jquery-ui/jquery-ui.min',
    'moment': '/cache/public/js/moment/moment.min',
    'angular': '/cache/public/js/angular/angular.min',
    'angularAMD': '/cache/public/js/angular/angularAMD.min',
    'angular-sanitize': '/cache/public/js/angular/angular-sanitize.min',
    'ui-bootstrap-custom': '/cache/public/js/angular/ui-bootstrap-custom-0.12.0.min',
    'ui-bootstrap-custom-tpls': '/cache/public/js/angular/ui-bootstrap-custom-tpls-0.12.0.min',
    'fullcalendar': '/cache/public/js/calendar/fullcalendar.min',
    'ui-calendar': '/cache/public/js/calendar/ui-calendar',
    'skycon': '/cache/public/js/weather/skycons',
    'weather': 'weather/skycon',
    'global_var': '../global_var',
    'cookiereader': '../cookiereader',
    'auth_common': '../auth_common',
    'ngload': '/cache/public/js/requirejs/ngload',
    'calendar_tut': 'tutorial/calendar_tut'
    },
    shim: { 'angularAMD': ['angular'],
            'angular-sanitize': ['angular'],
            'ui-bootstrap-custom': ['angular'],
            'ui-bootstrap-custom-tpls': ['angular','ui-bootstrap-custom'],
            'ui-calendar': ['angular','ui-bootstrap-custom','ui-bootstrap-custom-tpls','fullcalendar'],
            'calendar_tut': ['ui-calendar'],
            'jquery-ui': ['jquery']
            },
    deps:['app']
});
