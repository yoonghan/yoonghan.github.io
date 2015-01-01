'use strict';
/**This angularJS is used by 2 webpages, signup and settings**/

var userProfileURL = "http://localhost:9000/user/profile";
var saveURL = "http://localhost:9000/user/profile";

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
	
	if($scope.ctcNo == undefined 
			&& $scope.profile.ctcNo.$viewValue != undefined
			){
		return true
	}
	
	return valid;
}

//Retrieve user profile
function retrieveEditProfile($scope, $http){
	//get user profile
	$http.get(userProfileURL).success(function(data){
		$scope.fstName = data.firstName;
		$scope.midName = data.midName;
		$scope.lstName = data.lastName;
		$scope.gender = data.gender;
		$scope.ctcNo = data.contactNo;
		$scope.cntry = data.country;
		//Complex to select state, thanks to Angular :(
		var jsonState=eval("({'id':'"+data.state+"'})");
		$scope.state = $scope.states[_.findIndex($scope.states, jsonState)];
	});
}

function init($scope){
	$scope.number = /^\+?[0-9]+$/;
	$scope.cntry = "MY";
	$scope.gender = "O";
	$scope.flag = false;
	$scope.formData = {};
}

//Request is gathered from user session
settingApp.controller('ProfileCtrl', ['$scope','$http', '$modal', '$routeParams',
   function ($scope, $http, $modal, $routeParams) {
	
	init($scope);
	
	//get all states
	$http.get('/cache/json/mlystate.json').success(function(data){
		$scope.states = data;
	});
	
	//get user profile
	$scope.fstName = $routeParams.firstName;
	$scope.lstName = $routeParams.lastName;
	$scope.edit = $routeParams.edit==1?true:false;
	
	if($scope.edit){
		//Retrieve all user profile
		retrieveEditProfile($scope, $http);
	}
	
	$scope.open = function (status) {
	   var modalInstance = $modal.open({
	     templateUrl: 'myModalContent.html',
	     controller: 'ModalInstanceCtrl',
	     backdrop: 'static',
	     resolve: {
	    	 status: function(){
	    		 return status;
	    	 }}
	   });
	};
	
	$scope.processForm = function() {
		
		if(checkNotValidity($scope) || $scope.profile.$valid==false)
			return;
		
	    if ($scope.flag) {
	        return;
	    }

		$scope.flag = true;
		$scope.formData = createProfileJSON($scope);
		
		if($scope.edit){
			update($http,$scope);
		}else{
			insert($http,$scope);
		}
		
	};
	
	/**Cancel button[S]**/
	$scope.cancel = cancelBtn;
	/**Cancel button[E]**/
}]);

function insert($http, $scope){
	$http({
        method  : 'PUT',
        url     : saveURL,
        data    : $scope.formData,  // pass in data as strings
        headers: {'Content-Type': 'application/json'}
    })
    .success(function(data) {
        if (data.success) {
        	$scope.open('new');
        }else{
        	$scope.errors = "We encounted exception, please try again."
        	$scope.flag = false;
        }
    })
    .error(function(data, status){
    	errorAction(status);
    	$scope.errors = data.errors;
    	$scope.flag = false;
    	location.href = '#';
    });
}

function update($http, $scope){
	
	$http({
        method  : 'POST',
        url     : saveURL,
        data    : $scope.formData,  // pass in data as strings
        headers: {'Content-Type': 'application/json'}
    })
    .success(function(data) {
        if (data.success) {
        	$scope.open('edit');
        	$scope.flag = false;
        }else{
        	$scope.errors = "We encounted exception, please try again."
        	$scope.flag = false;
        }
    })
    .error(function(data, status){
    	errorAction(status);
    	$scope.errors = data.errors;
    	$scope.flag = false;
   		location.href="#/notify/profile/1";
    });
}

settingApp.controller('ModalInstanceCtrl', function ($scope, $modalInstance, status) {
  $scope.status = status;
  
  $scope.ok = function () {
	if($scope.status == 'new')
		redirectPage();
	$modalInstance.close();
  };
});