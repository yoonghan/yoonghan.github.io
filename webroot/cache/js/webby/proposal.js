var proposalApp = angular.module('proposalApp', ['ngRoute','ui.bootstrap','ngAnimate']);

proposalApp.config(['$routeProvider', '$httpProvider',
             function($routeProvider, $httpProvider) {
         	
         	    $routeProvider
         	      .when('/load/:loadId', {
         	        templateUrl: 'proposal/loads',
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
	
  	  var interval = 6000;
  	  var MAX = 100;
  	  var stop;
  	
  	  $scope.progressValue = -1; 
  	
  	  /**Function for progress count[S]**/
  	  var progressFunc = function(){
  			if ($scope.progressValue < MAX) {
  				$scope.progressValue++;
  			} else {
  			  $scope.stopLoad();
  			}
    	  };
    	  /**Function for progress count[E]**/
  	  
  	  $scope.load = function() {
  /**Don't start a new fight if we are already fighting**/
  	      if ( angular.isDefined(stop) ) return;
  	
  /**load every 2 seconds**/
  	    
  	      stop = $interval(function() {	  
  	    	progressFunc();
  	      }, interval); 
  	  };
  	    
  	  $scope.stopLoad = function() {
  	      if (angular.isDefined(stop)) {
  	        $interval.cancel(stop);
  	        stop = undefined;
  	      }
  	  };
  		  
  	  $scope.$on('$destroy', function() {
  	        // Make sure that the interval is destroyed too
  	        $scope.stopLoad();
  	  });
  	  
  	  $scope.load();
  	  
}]);