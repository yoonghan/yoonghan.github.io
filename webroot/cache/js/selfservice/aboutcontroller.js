var aboutApp = angular.module('aboutApp', []);

aboutApp.config(['$httpProvider', function($httpProvider) {
	  $httpProvider.defaults.withCredentials = true;
	  $httpProvider.defaults.useXDomain = true;
}])

aboutApp.controller('aboutCtrl', ['$scope', '$http',
    function ($scope, $http) {
        //use user setting rather than server to redirect user for unnecessary usages.
        if(cookieAccess(Exist))
            $scope.regNo = registrationNoURL;
        else
            errorAction(401)
    }
]);