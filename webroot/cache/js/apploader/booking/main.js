require.config({
    baseUrl: '/cache/js/apploader/booking',
    paths: {
		'app':	'app',
		'jquery': '../../lib/jquery/jquery.min',
		'lodash': '../../lib/lodash/lodash.min',
        'jquery-ui': '../../lib/jquery/jquery-ui/jquery-ui.min',
        'moment': '../../lib/moment/moment.min',
        'angular': '../../lib/angular/angular.min',
        'angularAMD': '../../lib/angular/angularAMD.min',
        'angular-sanitize': '../../lib/angular/angular-sanitize.min',
        'ui-bootstrap-custom': '../../lib/angular/ui-bootstrap-custom-0.12.0.min',
        'ui-bootstrap-custom-tpls': '../../lib/angular/ui-bootstrap-custom-tpls-0.12.0.min',
        'fullcalendar': '../../lib/calendar/fullcalendar.min',
        'ui-calendar': '../../lib/calendar/ui-calendar',
        'skycon': '../../lib/ext/weather/skycons',
        'weather': 'weather/skycon',
        'global_var': '../../selfservice/global_var',
        'cookiereader': '../../selfservice/cookiereader',
        'auth_common': '../../selfservice/auth_common',
        'ngload': '../../../lib/requirejs/ngload',
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