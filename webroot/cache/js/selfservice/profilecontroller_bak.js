'use strict';

var settingApp = angular.module('settingApp', ['ngRoute','ui.bootstrap','ngAnimate']);

/**
 * The main loader.
 */
settingApp.config(['$routeProvider', '$httpProvider',
    function($routeProvider, $httpProvider) {
	
		$httpProvider.defaults.withCredentials = true;
		$httpProvider.defaults.useXDomain = true;
		
		
		$routeProvider
		  .when('/notify/profile/:firstName/:lastName', {
		    templateUrl: 'setting/profile',
		    controller: 'ProfileCtrl',
		    controllerAs: 'profile'
		  });
}]);

/**
 * Initial Controller
 */
settingApp.controller('profileController', ['$scope', '$route', '$routeParams', '$location', '$http',
    function ($scope, $route, $routeParams, $location, $http) {
	
		//get user profile
		$http.get('http://localhost:9000/user/basicinfo').success(function(data){
			$scope.fstName = encodeURI(data.firstName);
			$scope.lstName = encodeURI(data.lastName);
			
			$location.url('/notify/profile/'+$scope.fstName+"/"+$scope.lstName);
		
			$scope.$route = $route;
			$scope.$location = $location;
			$scope.$routeParams = $routeParams;
			
			//if this user no longer new, let's it go.
			if(!data.newUser){
				redirectPage();
			}
	    });
	}
]);

/**
 * Site to be redirected to
 */
function redirectPage(){
	window.location.href='/';
}

