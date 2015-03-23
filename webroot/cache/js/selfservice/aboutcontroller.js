var aboutApp = angular.module('aboutApp', []);

aboutApp.config(['$httpProvider', function($httpProvider) {
	  $httpProvider.defaults.withCredentials = true;
	  $httpProvider.defaults.useXDomain = true;
}])

aboutApp.controller('aboutCtrl', ['$scope', '$http',
    function ($scope, $http) {
        $scope.regNo = registrationNoURL;
    }
]);