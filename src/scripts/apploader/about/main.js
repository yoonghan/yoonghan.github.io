require.config({
    baseUrl: '/cache/js/apploader/about',
    paths: {
        'app': 'app',
        'angular': '/cache/public/js/angular/angular.min',
        'angularAMD': '/cache/public/js/angular/angularAMD.min',
        'global_var': '../global_var',
        'cookiereader': '../cookiereader',
        'auth_common': '../auth_common'
    },
    shim: { 'angularAMD': ['angular'] },
    deps:['app']
});
