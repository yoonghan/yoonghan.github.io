"use strict";
var subsReminderURL = "http://localhost:9000/reminder/profile";

/**
 * Reminder controller
 */
settingApp.controller('ReminderCtrl', ['$scope', '$http', '$modal', '$routeParams',
      function($scope, $http, $modal, $routeParams) {
	
		$scope.succ = function(data){
			if(data.success != "ok"){
				$scope.r_day = data.oneDayB4;
				$scope.r_week = data.oneWeekB4;
				if(data.alertEmail != undefined && data.alertEmail != ""){
					$scope.chk_email = true;
					$scope.n_email = data.alertEmail;
				}
				if(data.alertSMS != undefined && data.alertSMS != ""){
					$scope.chk_sms = true;
					$scope.n_sms = data.alertSMS;
				}
				$scope.allowCreation = data.allowCreation;
			}
	    };
	    
	    getHTTP($http,subsReminderURL, $scope.succ);
	
		$scope.save = function(){
			
			if ($scope.flag) {
		        return;
		    }
			
			if ($scope.setting.$valid == false || extraInvalidChk($scope)){
				$scope.flag = false;
				return;
			}
	
			$scope.flag = true;
			$scope.formData = saveReminder($scope);
			
			var succFunc = function(data){
				$scope.open();
		    	$scope.flag = false;
				}
		    var failFunc = function(data){
		        $scope.flag = false;
		    	}
		    var errFunc = function(data){
		    	$scope.errors = data.errors;
		    	$scope.flag = false;
		   		}
		    
		    funcHTTP($http, "POST", subsReminderURL, $scope.formData, succFunc, failFunc, errFunc);
		}
		/**Save user profile[E]**/
		
		/**Cancel button[S]**/
		$scope.cancel = cancelBtn;
		/**Cancel button[E]**/
		
		/**Open Modal[S]**/
		$scope.open = function () {
		   var modalInstance = $modal.open({
		     templateUrl: 'myModalContent.html',
		     controller: 'ModalInstanceCtrl',
		     backdrop: 'static',
		     resolve: {}
		   });
		};
		/**Open Modal[E]**/
	
}]);

/**Copy user profiles**/
function saveReminder($scope){
	
	//init value
	$scope.r_day = $scope.r_day == undefined ? false: $scope.r_day;
	$scope.r_week = $scope.r_week == undefined ? false: $scope.r_week;
	$scope.chk_email = $scope.chk_email == undefined ? false: $scope.chk_email;
	$scope.chk_sms = $scope.chk_sms == undefined ? false: $scope.chk_sms;
	$scope.allowCreation = $scope.allowCreation == undefined ? false: $scope.allowCreation;
	
	var jsonVal = {
		oneDayB4: $scope.r_day,
	    oneWeekB4: $scope.r_week,
	    alertEmail: ($scope.chk_email ? $scope.n_email : ""),
	    //alertSMS: ($scope.chk_sms? $scope.n_sms: ""),//disabled
	    allowCreation:$scope.allowCreation
	};
	
	return jsonVal;
}

/**Check extra fields that cannot be handled by angular**/
function extraInvalidChk($scope){
	return $scope.chk_email && ($scope.setting.n_email.$viewValue=='' || $scope.setting.n_email.$viewValue==undefined);
}
