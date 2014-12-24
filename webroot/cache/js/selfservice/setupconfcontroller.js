'use strict';

var calLoadURL = "http://localhost:9000/tools/calendarload";
var calSetupConfURL = "http://localhost:9000/tools/calendarconf";
var month=["January","February","March","April","May","June","July","August","September","October","November","December"];
var nextLocation = "/selfservice/booking/calendar"; 
var redirectURL = "http://login.jomjaring.com";

/**
 * Special application that stood by it own, used to check data and load the progress bar
 */
var setupConfApp = angular.module('setupConfApp', ['ngRoute','ui.bootstrap','ngAnimate','calFilters']);

/**
 * Filters
 */
angular.module('calFilters', []).filter('calfilter', function() {
  return function(input) {
	var d = new Date(eval(input));
    return d.getFullYear() + " / " + month[d.getMonth()];
  };
});

/**
 * The main loader.
 */
setupConfApp.config(['$routeProvider', '$httpProvider',
    function($routeProvider, $httpProvider) {
	
	  $httpProvider.defaults.withCredentials = true;
	  $httpProvider.defaults.useXDomain = true;
	
	    $routeProvider
	      .when('/load/:loadId', {
	        templateUrl: 'setup-confirm/progressbar',
	        controller: 'ProgressCtrl',
	        controllerAs: 'progress'
	      })
	      .when('/load/content/:loadId', {
	        templateUrl: 'setup-confirm/content',
	        controller: 'ContentCtrl',
	        controllerAs: 'content'
	      });
}])

/**
 * Progress bar controller
 */
setupConfApp.controller('loaderCtrl', ['$scope', '$route', '$routeParams', '$location',
    function ($scope, $route, $routeParams, $location) {

		$location.url('/load/1');
	
		$scope.$route = $route;
		$scope.$location = $location;
		$scope.$routeParams = $routeParams;
		
		
	}
]);

/**
 * Start of the calendar that have been loaded
 */
setupConfApp.controller('ProgressCtrl', ['$scope', '$http', '$interval', '$routeParams', '$location',
   function($scope, $http, $interval, $routeParams, $location) {

	  var amt = 100;
	  var maxWait = 2000;
	  var maxRetryCount = 25
	  
	  //don't start at 0, user will suspect nothing is working
	  
	  $scope.progressValue = -1; 
	  $scope.countTo = amt;
	  $scope.countFrom = 0;
	  
	  $scope.message = "";
	  
	  $scope.maxRetryCount = maxRetryCount;
	  $scope.retryCount = 0;
	  
	  var stop;
	  
	  /**Function for progress count[S]**/
	  var progressFunc = function(data){
			if ($scope.progressValue < $scope.countTo 
					&& $scope.retryCount < $scope.maxRetryCount) {
			  if(data.length != 0){
				  var count = eval(data[0].count);
				  var total = eval(data[0].total);
				  
				  var progress = Math.floor(count/total * amt);
				  $scope.progressValue = progress;  
			  }

/**Handles retry**/
			  $scope.retryCount++;
			  if($scope.retryCount > 12){
				  $scope.message = "Umm, something seems strange. But just to let you know, we're still here with you.";
			  }else if($scope.retryCount > 3){
				  $scope.message = "We're still loading, do be patient.";
			  }
			  
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
	    	  getHTTP($http, calLoadURL, progressFunc);
	      }, maxWait, maxRetryCount+1); 
	  };
	    
	  $scope.stopLoad = function() {
	      if (angular.isDefined(stop)) {
	        $interval.cancel(stop);
	        stop = undefined;
	      }
	      
	      $location.url('/load/content/100');
	      /**TODO: What should happen where there is no data?**/
	  };
		  
	  $scope.$on('$destroy', function() {
	        // Make sure that the interval is destroyed too
	        $scope.stopLoad();
	  });
	  
	  
  }]);
  
setupConfApp.controller('ContentCtrl', ['$scope', '$routeParams', '$http',  '$modal',  
  function($scope, $routeParams, $http, $modal) {
	var startD = new Date();
    var endD = new Date();
    
    /**Setup [S]**/
    $scope.minDate = new Date();
    $scope.maxDate = new Date();
    $scope.word = /^([A-Z|a-z|0-9]+\s{0,1}[A-Z|a-z|0-9]*)*$/;
    $scope.events = [];
    $scope.predicate = 'start';
    /**Setup [E]**/
    
	/**Refilter the search[S]**/
	$scope.filterSearch = function(){
		if($scope.endD != undefined && $scope.startD != undefined){
			$scope.endD.setMinutes(0, 0, 0)
			$scope.endD.setHours(24)
	    	$http({
		        method  : "GET",
		        url     : calSetupConfURL+ "/" + $scope.startD.getTime() + "/" + $scope.endD.getTime(),
		        headers: {'Content-Type': 'application/json'}
		    })
	        .success(function(data) {
	        	$scope.events = data;
	        	$scope.groupEvents = _.groupBy($scope.events, function(num){ var d = new Date(num.start); var date = (new Date(d.getFullYear(), d.getMonth(), 1, 0, 0, 0, 0)); return date.getTime();});
	        })
	        .error(function(data){
	        	$scope.events = [];
	        	$scope.groupEvents = [];
	        });
		}else{
			var confFunc = function(data){
				$scope.events = data;
				$scope.groupEvents = _.groupBy($scope.events, function(num){ var d = new Date(num.start); var date = (new Date(d.getFullYear(), d.getMonth(), 1, 0, 0, 0, 0)); return date.getTime();});
		    };
			getHTTP($http, calSetupConfURL+"/0/0", confFunc);
		}
	};
	/**Refilter the search[E]**/
	
    /**Retrieve user profile[S]**/
    $scope.filterSearch();
	/**Retrieve user profile[E]**/
    
	/**CalendarControl [S]**/
	$scope.dateOptions = {
	    formatYear: 'yy',
	    startingDay: 1
	};
	
	/**DialogBox[S]**/
    $scope.open = function (status) {
    	 var modalInstance = $modal.open({
	    	 templateUrl: 'myModalContent.html',
	    	 controller: 'ModalInstanceCtrl',
	    	 backdrop: 'static',
	    	 resolve: {status: function(){
	    		 return status;
	    	 }}
    	 });
    	 
    	 modalInstance.result.then(function (status){
    		 if(status == 'reject'){
    			 $http({
 			        method  : "DELETE",
 			        url     : calSetupConfURL,
 			        data    : {},  // pass in data as strings
 			        headers: {'Content-Type': 'application/json'}
 			    })
 		        .success(function(data) {
 		        	
 		            $scope.flag = false;
 		            if (data.success) {
 		            	$scope.open('ok');
 		            }else{
 		            	$scope.open('nak');
 		            }
 		        });
    		 }else if(status == 'reset'){
    			 $scope.filterSearch();
    		 }
    	 });
    	 
    	 
    }
    /**DialogBox[E]**/
    
    /**Calendar[S]**/
    $scope.opencal = function($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.opened = true;
      };
    $scope.opencal2 = function($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.opened2 = true;
      };
    /**Calendar[E]**/
      
    function setupData(){
    	return $scope.events;
    }
    
    /**Setup confirmation [S]**/
    $scope.rejectForm = function(){
    	$scope.open("reject");
    }
    
    $scope.resetForm = function(){
    	$scope.startD = undefined;
    	$scope.endD = undefined;
    	$scope.open("reset");
    }
    
	$scope.processForm = function(){
		if ($scope.flag) {
	        return;
	    }
		
		if ($scope.setup.$valid == false){
			$scope.flag = false;
			$scope.open('nak');
			return;
		}
		
	    $scope.flag = true;
	    
	    $scope.formData = setupData();
    	
    	$http({
	        method  : "POST",
	        url     : calSetupConfURL,
	        data    : $scope.formData,  // pass in data as strings
	        headers: {'Content-Type': 'application/json'}
	    })
        .success(function(data) {
            $scope.flag = false;
            if (data.success) {
            	$scope.open('ok');
            }else{
            	$scope.open('nak');
            }
        })
        .error(function(data){
        	$scope.flag = false;
        });
	}
	/**Setup confirmation [E]**/
	
}]);

/**Pop up dialog[S]**/
setupConfApp.controller('ModalInstanceCtrl', function ($scope, $modalInstance, status) {
  $scope.status = status;
  if(status == "ok"){
	  $scope.statMsg = "Status Confirmed."
  }else if(status == "reset"){
	  $scope.statMsg = "Reload values? Current value will be resetted."
  }else if(status == "reject"){
	  $scope.statMsg = "Remove all values? All values will be deleted."
  }else if(status == "nak"){
	  $scope.statMsg = "Found some errors, please verify your inputs."
  }else{
	  status = "others";
	  $scope.status = status;
	  $scope.statMsg = "Problem Accepting your input. Check again your values."
  }

  $scope.cancel = function(){
	  $modalInstance.close();  
  }
  $scope.ok = function () {
	  if(status == 'reset'){
		  $modalInstance.close('reset');
	  }else if(status == 'reject'){
		  $modalInstance.close('reject');
      }else if(status == 'ok'){
		  $modalInstance.close();
		  location.href = nextLocation;
	  }else{
		  $modalInstance.close();
	  }
  };
});
/**Pop up dialog[E]**/

function obtainDate(date, opt){
	if(opt==1)
		return moment(date).format("MMM Do, YYYY");
	if(opt==2)
		return moment(date).format("MMM, YYYY");
}

function obtainTime(time){
	return moment(time).format("HHmm");
}

