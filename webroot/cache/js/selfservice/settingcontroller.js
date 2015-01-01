'use strict';

var settingApp = angular.module('settingApp', ['ngRoute','ui.bootstrap','ngAnimate']);
var initialStart = "/notify/subscription";
var returnURL = "http://localhost:8000/selfservice/booking/calendar";
/**
 * The main loader.
 */
settingApp.config(['$routeProvider', '$httpProvider',
    function($routeProvider, $httpProvider) {
	
		$httpProvider.defaults.withCredentials = true;
		$httpProvider.defaults.useXDomain = true;
		
		$routeProvider
		  .when('/notify/reminder', {
		    templateUrl: 'setting/reminder',
		    controller: 'ReminderCtrl',
		    controllerAs: 'reminder'
		  })
		  .when('/notify/subscription', {
		    templateUrl: 'setting/subscription',
		    controller: 'SubscriptionCtrl',
		    controllerAs: 'profile'
		  })
		  .when('/notify/profile/:edit', {
		    templateUrl: 'setting/profile',
		    controller: 'ProfileCtrl',
		    controllerAs: 'profile'
		  })
		  .when('/notify/profile/:edit/:firstName/:lastName', {
		    templateUrl: 'setting/profile',
		    controller: 'ProfileCtrl',
		    controllerAs: 'profile'
		  });
}]);

/**
 * Initial Controller
 */
settingApp.controller('loaderCtrl', ['$scope', '$route', '$routeParams', '$location',
    function ($scope, $route, $routeParams, $location) {
		
		$location.url(initialStart);
	
		$scope.$route = $route;
		$scope.$location = $location;
		$scope.$routeParams = $routeParams;
		
		$scope.cancel = cancelBtn; 
	}
]);

/**
 * Initial Controller
 */
settingApp.controller('profileController', ['$scope', '$route', '$routeParams', '$location', '$http',
    function ($scope, $route, $routeParams, $location, $http) {
	
		//get user profile
	
		$scope.succ = function(data){
			$scope.fstName = encodeURI(data.firstName);
			$scope.lstName = encodeURI(data.lastName);
			
			$location.url('/notify/profile/0/'+$scope.fstName+"/"+$scope.lstName);
		
			$scope.$route = $route;
			$scope.$location = $location;
			$scope.$routeParams = $routeParams;
			
			//if this user no longer new, let it go.
			if(!data.newUser){
				redirectPage();
			}
	    };
	    
	    getHTTP($http,'http://localhost:9000/user/basicinfo', $scope.succ);
	}
]);

/**
 * Site to be redirected to
 */
function redirectPage(){
	window.location.href='/';
}

/**
 * Cancel operation
 */
var cancelBtn = function(){
	window.location.href=returnURL;
}