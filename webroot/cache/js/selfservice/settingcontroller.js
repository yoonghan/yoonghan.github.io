'use strict';

var settingApp = angular.module('settingApp', ['ngRoute','ui.bootstrap','ngAnimate','ngSanitize']);
/**
 * Image loader
 */
function imgLoaded(img){
    var imgWrapper = img.parentNode;

    imgWrapper.className += imgWrapper.className ? ' loaded' : 'loaded';
};

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
settingApp.controller('loaderCtrl', ['$scope', '$route', '$routeParams', '$location', '$timeout',
    function ($scope, $route, $routeParams, $location, $timeout) {
		/**Tutorial[S]**/
		tutorialInit($scope, $location, $timeout)
		/**Tutorial[E]**/
		
		$location.url(initialStartURL);
	
		$scope.$route = $route;
		$scope.$location = $location;
		$scope.$routeParams = $routeParams;
		
		$scope.cancel = cancelBtn; 
	}
]);

/**
 * Profile  controller, only used for new signup
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
	    
	    getHTTP($http, basicURL, $scope.succ);
	}
]);

/**
 * Site to be redirected to
 */
function redirectPage(){
	window.location.href=homeURL;
}

/**
 * Cancel operation
 */
var cancelBtn = function(){
	//read the previous page.
	var prvPg = document.referrer;
	
	if(prvPg.indexOf("/selfservice/") == -1){
		prvPg=homeURL;
	}
	window.location.href=prvPg;
	
}

settingApp.controller('ModalInstanceCtrl', function ($scope, $modalInstance) {
  $scope.ok = function () {
	$modalInstance.close();
  };
});