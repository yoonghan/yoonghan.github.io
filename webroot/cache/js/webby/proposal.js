
var angularConnect = undefined;
var previousTime = 0;

function getTotalDurationInSeconds(){
	return 10;
}

function pauseAnimationAt(time){
	if(typeof angularConnect === 'undefined'){
		console.log("Unconnected");
	}else{
		if(time != previousTime){
			angularConnect.progressValue++;
			previousTime = time;
		}
	}
}

function connectme(scope){
	$("#change").text("HELLO THERE");
	angularConnect = scope;
	angularConnect.progressValue++;
}

var proposalApp = angular.module('proposalApp', ['ngRoute','ngAnimate']);

proposalApp.config(['$routeProvider', '$httpProvider',
             function($routeProvider, $httpProvider) {
         	
         	    $routeProvider
         	      .when('/load/:loadId', {
         	        templateUrl: 'special/proposal/',
         	        controller: 'ProgressCtrl',
         	        controllerAs: 'progress'
         	      });
         	    
         	   
         }])
         
/**
 * Progress bar controller
 */
proposalApp.controller('loaderCtrl', ['$scope', '$route', '$routeParams', '$location',
    function ($scope, $route, $routeParams, $location) {

		$location.url('/load/1');
	
		$scope.$route = $route;
		$scope.$location = $location;
		$scope.$routeParams = $routeParams;
	}
]);


proposalApp.controller('ProgressCtrl', ['$scope', '$http', '$interval', '$routeParams', '$location',
     function($scope, $http, $interval, $routeParams, $location) {
	
//  	  var interval = 1000;
//  	  var MAX = 50;
//  	  var stop;
//  	
		  $scope.progressValue = -1; 
//  	
//  	  /**Function for progress count[S]**/
//  	  var progressFunc = function(){
//  			if ($scope.progressValue < MAX) {
//  				$scope.progressValue++;
//  			} else {
//  			  $scope.stopLoad();
//  			}
//    	  };
//    	  /**Function for progress count[E]**/
//  	  
//  	  $scope.load = function() {
//  /**Don't start a new fight if we are already fighting**/
//  	      if ( angular.isDefined(stop) ) return;
//  	
//  /**load every 2 seconds**/
//  	    
//  	      stop = $interval(function() {	  
//  	    	progressFunc();
//  	      }, interval); 
//  	  };
//  	    
//  	  $scope.stopLoad = function() {
//  	      if (angular.isDefined(stop)) {
//  	        $interval.cancel(stop);
//  	        stop = undefined;
//  	      }
//  	  };
//  		  
//  	  $scope.$on('$destroy', function() {
//  	        // Make sure that the interval is destroyed too
//  	        $scope.stopLoad();
//  	  });
//  	  
//  	  $scope.load();
    $("#change").text("MODIFY");
	connectme($scope);
}]);