'use strict';

var profileApp = angular.module('profileApp', ['ui.bootstrap']);

profileApp.config(['$httpProvider', function($httpProvider) {
  $httpProvider.defaults.withCredentials = true;
  $httpProvider.defaults.useXDomain = true;
}])

//Create the values to be populated
function createProfileJSON($scope){
	return {
		firstName: $scope.fstName,
		midName: $scope.midName,
		lastName: $scope.lstName,
		gender: $scope.gender,
		contactNo: $scope.ctcNo,
		country: $scope.cntry,
		state: $scope.state.id
	}
}

//Check validity of form
function checkNotValidity($scope){
	var valid = false;
	
	if($scope.ctcNo === undefined && $scope.profile.ctcNo.$viewValue != undefined){
		return true
	}
	
	return valid;
}

//
function redirectPage(){
	window.location.href='/';
}

function init($scope){
	$scope.number = /^\+?[0-9]+$/;
	$scope.cntry = "MY";
	$scope.gender = "O";
	$scope.flag = false;
	$scope.formData = {};
}

//Request is gathered from user session
profileApp.controller('profileController', ['$scope','$http', '$modal',  
   function ($scope, $http, $modal) {
	
	init($scope);
	
	//get all states
	$http.get('/cache/json/mlystate.json').success(function(data){
		$scope.states = data;
	});
	
	//get user profile
	$http.get('http://localhost:9000/user/basicinfo').success(function(data){
		$scope.fstName = data.firstName;
		$scope.lstName = data.lastName;
		
		//if this user no longer new, let's it go.
		if(!data.newUser){
			redirectPage();
		}
    });
	
	$scope.open = function () {
	   var modalInstance = $modal.open({
	     templateUrl: 'myModalContent.html',
	     controller: 'ModalInstanceCtrl',
	     backdrop: 'static',
	     resolve: {}
	   });
	};
	
	$scope.processForm = function() {
		
		if(checkNotValidity($scope))return;
		
	    if ($scope.flag) {
	        return;
	    }

		$scope.flag = true;
		$scope.formData = createProfileJSON($scope);
		
		$http({
	        method  : 'PUT',
	        url     : 'http://localhost:9000/user/profile',
	        data    : $scope.formData,  // pass in data as strings
	        headers: {'Content-Type': 'application/json'}
	    })
        .success(function(data) {
            if (data.success) {
            	$scope.open();
            }else{
            	$scope.errors = "We encounted exception, please try again."
            	$scope.flag = false;
            }
        })
        .error(function(data){
        	$scope.errors = data.errors;
        	$scope.flag = false;
        });
	};
}]);

profileApp.controller('ModalInstanceCtrl', function ($scope, $modalInstance) {
  $scope.ok = function () {
	redirectPage();
	$modalInstance.close();
  };
});

