require.config({
    baseUrl: '/cache/js/apploader/about',
    paths: {
        'app': 'app',
        'angular': '../../lib/angular/angular.min',
        'angularAMD': '../../lib/angular/angularAMD',
        'global_var': '../../selfservice/global_var',
        'cookiereader': '../../selfservice/cookiereader',
        'auth_common': '../../selfservice/auth_common'
    },
    shim: { 'angularAMD': ['angular'] },
    deps:['app']
});