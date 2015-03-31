define([
'angularAMD',
'tutorial',
'btnfunc',
'jquery',
'angular-route',
'angular-animate',
'angular-sanitize',
'ui-bootstrap-custom',
'ui-bootstrap-custom-tpls',
], function (angularAMD, tutorial, btnfunc) {
  var defaultPath="view/"

  var app = angular.module("ngreq-app", ['ngRoute','ui.bootstrap','ngAnimate','ngSanitize']);

  app.config(function ($httpProvider, $routeProvider, $locationProvider) {
    /**Send Cookie [S]**/
    	$httpProvider.defaults.withCredentials = true;
    	$httpProvider.defaults.useXDomain = true;
    /**Send Cookie [E]**/
    $routeProvider
    .when("/home", angularAMD.route({
        templateUrl: defaultPath+'home'
    }))
    .when('/notify/reminder', angularAMD.route({
    	templateUrl: defaultPath+'reminder', controller: 'ReminderCtrl'
    }))
    .when('/notify/subscription', angularAMD.route({
    	templateUrl: defaultPath+'subscription', controller: 'SubscriptionCtrl'
    }))
    .when('/notify/profile/:edit', angularAMD.route({
        templateUrl: defaultPath+'profile', controller: 'ProfileCtrl'
    }))
    .when('/notify/profile/:edit/:firstName/:lastName', angularAMD.route({
        templateUrl: defaultPath+'profile', controller: 'ProfileCtrl'
     }))
    .otherwise({redirectTo: "/notify/subscription"});
  });

  app.controller('loaderCtrl', function ($scope, $route, $routeParams, $location, $timeout) {
        /**Tutorial[S]**/
        tutorial.tutorialInit($scope, $location, $timeout);
        /**Tutorial[E]**/
        $scope.cancel = cancelBtn;
  });

  /**
   * Profile  controller, only used for new signup
   */
  app.controller('profileController', function ($scope, $route, $routeParams, $location, $http) {

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
  				btnfunc.redirectPage();
  			}
  	    };

  	    getHTTP($http, basicURL, $scope.succ);
  });

  return angularAMD.bootstrap(app);
});