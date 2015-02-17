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
		country: $scope.cntry,
		state: $scope.state.id,
		postCode: $scope.pstCd,
		address: $scope.addr,
		email: $scope.email,
		contactNo: $scope.ctcNo
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
	
	if($scope.pstCd == undefined 
			&& $scope.profile.pstCd.$viewValue != undefined
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
		$scope.pstCd = data.postCode;
		$scope.addr = data.address;
		$scope.email = data.email;
		
		//Complex to select state, thanks to Angular :(
		var jsonState=eval("({'id':'"+data.state+"'})");
		$scope.state = $scope.states[_.findIndex($scope.states, jsonState)];
	});
}

function init($scope){
	$scope.postalCd = /^[1-9][0-9]{0,4}$/;
	$scope.number = /^\+?[0-9]{0,13}$/;
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
	     templateUrl: 'popupdialog.html',
	     controller: 'ModalInstanceCtrlProfile',
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
		$scope.errors = undefined;
		
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
	
	var succFunc = function(data){$scope.open('new');}
    var failFunc = function(data){
    	$scope.errors = data.errors;
        $scope.flag = false;}
    var errFunc = function(data){
    	$scope.errors = data.errors;
    	$scope.flag = false;
    	location.href = '#';}
    
    funcHTTP($http, "PUT", saveURL, $scope.formData, succFunc, failFunc, errFunc);
	
}

function update($http, $scope){
	
	var succFunc = function(data){
		$scope.open('edit');
    	$scope.flag = false;
		}
    var failFunc = function(data){
    	$scope.errors = data.errors;
        $scope.flag = false;
    	}
    var errFunc = function(data){
    	$scope.errors = data.errors;
    	$scope.flag = false;
   		location.href="#/notify/profile/1";
   		}
    
    funcHTTP($http, "POST", saveURL, $scope.formData, succFunc, failFunc, errFunc);
	
}

/**
 * Used specifically for new registration. Do not remove.
 */
settingApp.controller('ModalInstanceCtrlProfile', function ($scope, $modalInstance, status) {
  $scope.status = status;
  
  $scope.ok = function () {
	if($scope.status == 'new')
		redirectPage();
	$modalInstance.close();
  };
});