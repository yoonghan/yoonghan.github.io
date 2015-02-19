'use strict';

/**
 * Special application that stood by it own, used to check data and load the progress bar
 */
var bookinginfoApp = angular.module('bookinginfoApp', ['ngRoute','ui.bootstrap','ngAnimate','calFilters']);

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
 * Define service for sharing
 */
bookinginfoApp.factory("calendar",function(){
    return [];
});

/**
 * The main loader.
 */
bookinginfoApp.config(['$routeProvider', '$httpProvider',
    function($routeProvider, $httpProvider) {
	
	  $httpProvider.defaults.withCredentials = true;
	  $httpProvider.defaults.useXDomain = true;
	
	    $routeProvider
	      .when('/load', {
	        templateUrl: 'bookinginfo/bookinglist',
	        controller: 'BookingListCtrl',
	        controllerAs: 'bookinglist'
	      })
	      .when('/user/:idx/:oid', {
	        templateUrl: 'bookinginfo/userlist',
	        controller: 'UserListCtrl',
	        controllerAs: 'userlist'
	      });
}])

/**
 * Init location
 */
bookinginfoApp.controller('loaderCtrl', ['$scope', '$route', '$routeParams', '$location', '$http', '$modal',  
    function ($scope, $route, $routeParams, $location, $http, $modal) {

		$location.url('/load');
	
		$scope.$route = $route;
		$scope.$location = $location;
		$scope.$routeParams = $routeParams;
		
		/**DialogBox[S]**/
	    $scope.open = function (status, message, data, calInfo) {
	    	 var modalInstance = $modal.open({
		    	 templateUrl: 'popupdialog.html',
		    	 controller: 'ModalInstanceCtrl',
		    	 backdrop: 'static',
		    	 resolve: {status: function(){
		    		 return status;
		    	 }, message: function(){
		    		 return message;
		    	 }}
	    	 });
	    	 
	    	 modalInstance.result.then(function (status){
	    		 if(status == 'delete'){
	    			var succFunc = function(data){
						calInfo.avail = calInfo.avail + 1;
						$route.reload();
						}
				    var failFunc = function(data){
				    	$scope.open("error",data.error)
				    	}
				    var errFunc = function(data){
				    	$scope.open("error","Please try again later, or inform the admin.")
				   		}
				    
				    funcHTTP($http, "DELETE", cmdreservationURL, data, succFunc, failFunc, errFunc);
	    		 }
	    	 });
	    }
	    /**DialogBox[E]**/
	}
]);
  
/**
 * Booking reservation
 */
bookinginfoApp.controller('BookingListCtrl', ['$scope', '$routeParams', '$http', '$location', 'calendar',
  function($scope, $routeParams, $http, $location, calendar) {
	/**Init[S] **/
	$scope.predicate = "start";
	$scope.reverse = false;
	if(calendar.length != 0) {
		calendar = [];
	}
	
	$scope.goSettings = function(){
		window.location.href=settingsURL;
	}
	/**Init[E]**/
	
	/**Retrieve user profile[S]**/
	var bookingListFunc = function(data){
		$scope.bookingList = calendar;
		
		for(var i=0; i < data.length; i++){
			var currElem = data[i];
			
			$scope.bookingList.push({
				start: currElem.start,
				end: currElem.end,
				allDay: currElem.allDay,
				title: currElem.title,
				desc: currElem.desc,
				avail: currElem.availability,
				id: currElem._id,
				close: true,
				info: []
				});
		}
		data = null;
	}
	
	getHTTP($http, bookingListURL, bookingListFunc);
	/**Retrieve user profile[E]**/
	
	/**Check reporting allow[S]**/
	var allowReportFunc = function(data){
		var value = data;
		if(typeof data !== 'undefined'){
			if(typeof data.success !== 'undefined'){
				$scope.rpt_allowed = true;
			}
		}
	}
	getHTTP($http, reportURL, allowReportFunc);
	/**Check reporting allow[E]**/
	
	$scope.genReport= function(){
		var succFunc = function(data){
			$scope.rpt_disabled = true;
		}
	    var failFunc = function(data){
	    	$scope.open("error",data.error)
	    }
	    var errFunc = function(data){
	    	$scope.open("error","Please try again later, or inform the admin.")
	   	}
	    
	    funcHTTP($http, "POST", reportGenUrl, {}, succFunc, failFunc, errFunc);
	}
	
	$scope.exposeUsers = function(idx,id){
		var oid = id.$oid;
		$location.url('/user/'+idx+'/'+oid);
	}
	
	$scope.returnForm = function(){
		location.href = homeURL;
	}
  }
]);

bookinginfoApp.controller('UserListCtrl', ['$scope', '$routeParams', '$http',  '$modal', '$route', 'calendar', 
  function($scope, $routeParams, $http, $modal, $route, calendar) {
	
	/**Init[S] **/
	$scope.predicate = "fname";
	$scope.reverse = false;
	/**Init[E] **/
	
	/**Expose user[S]**/
	var oid = $routeParams.oid;
	var idx = $routeParams.idx;


	var userListFunc = function(data){
		var value = data;		
		$scope.userList = [];
		for(var i=0; i < value.length; i++){
			var currElem = value[i];
			
			$scope.userList.push({
				firstName: currElem.firstName,
				lastName: currElem.lastName,
				id: currElem.maskId
				});
		}
		value = null;
	}

	getHTTP($http, userInfoURL+"/"+oid, userListFunc);
	/**Expose user[E]**/
	
	//Reuse old scope data[S]
	$scope.calInfo = calendar[idx];
	//Reuse old scope data[E]
	
	$scope.unsubuser = function(maskId){
		$scope.flag = true;
		var calId = $scope.calInfo.id;
		/**booking confirmation [S]**/
		$scope.formData = {_id: calId, userId: maskId};
		$scope.open("delete","",$scope.formData, $scope.calInfo);
		$scope.flag = false;
	    /**booking confirmation [E]**/
	}
  }
]);

/**Pop up dialog[S]**/
bookinginfoApp.controller('ModalInstanceCtrl', function ($scope, $modalInstance, status, message) {
  $scope.status = status;
  if(status == "delete"){
	  $scope.statMsg = "Confirm to forcefully remove the user reservation?";
  }else if(status == "error"){
	  $scope.statMsg = message;
  }
  $scope.cancel = function(){
	  $modalInstance.close();  
  }
  $scope.ok = function () {
	  if(status == 'delete'){
		  $modalInstance.close('delete');
	  }else{
		  $modalInstance.close();
	  }
  };
});
/**Pop up dialog[E]**/