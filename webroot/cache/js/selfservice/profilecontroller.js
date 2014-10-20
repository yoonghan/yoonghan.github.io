'use strict';

var profileApp = angular.module('profileApp', []);

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
		state: $scope.state
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

//Request is gathered from user session
profileApp.controller('profileController', ['$scope','$http', 
   function ($scope, $http) {
	$http.get('http://localhost:9000/user/profile').success(function(data){
		$scope.fstName = data.firstName;
		$scope.lstName = data.lastName;
		
		//if this user no longer new, let's it go.
		if(!data.newUser){
			redirectPage();
		}
    });
	$scope.number = /^\+?[0-9]+$/;
	$scope.cntry = "MY";
	$scope.gender = "O";
	
	$scope.formData = {};
	
	$scope.processForm = function(isValid) {
		
		if(checkNotValidity($scope))return;
		
		$scope.formData = createProfileJSON($scope);
		
		$http({
	        method  : 'PUT',
	        url     : 'http://localhost:9000/user/profile',
	        data    : $scope.formData,  // pass in data as strings
	        headers: {'Content-Type': 'application/json'}
	    })
	        .success(function(data) {
	            if (data.success) {
	            	// create an alert box to thank then continue
	            	redirectPage();
	            }
	        })
	        .error(function(data){
	        	$scope.errors = data.errors;
	        });
		

	};

}]);
