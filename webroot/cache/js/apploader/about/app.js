"use strict";

define([
'angularAMD',
'global_var',
'cookiereader',
'auth_common'
], function (angularAMD) {
    var app = angular.module('aboutApp', []);

    app.config(['$httpProvider', function($httpProvider) {
    	  $httpProvider.defaults.withCredentials = true;
    	  $httpProvider.defaults.useXDomain = true;
    }])
    .controller('aboutCtrl', function ($scope, $http) {
            //use user setting rather than server to redirect user for unnecessary usages.
            if(cookieAccess(Exist))
                $scope.regNo = registrationNoURL;
            else
                errorAction(401)
        }
    );

    return angularAMD.bootstrap(app);
});