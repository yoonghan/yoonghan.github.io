"use strict";
var subsReportURL = "http://localhost:9000/report/setting";

/**
 * Report controller
 */
settingApp.controller('ReportCtrl', ['$scope', '$http', '$modal', '$routeParams',
      function($scope, $http, $modal, $routeParams) {
	
		$scope.succ = function(data){
			if(data.success != "ok"){
				$scope.email = data.email;
			}
	    };
	    
	    getHTTP($http,subsReportURL, $scope.succ);
	
		$scope.save = function(){
			
			if ($scope.flag) {
		        return;
		    }
			
			if ($scope.setting.$valid == false){
				$scope.flag = false;
				return;
			}
	
			$scope.flag = true;
			$scope.formData = saveReport($scope);
			
			var succFunc = function(data){
				$scope.open();
		    	$scope.flag = false;
				}
		    var failFunc = function(data){
		    	$scope.errors = data.errors;
		        $scope.flag = false;
		    	}
		    var errFunc = function(data){
		    	$scope.errors = data.errors;
		    	$scope.flag = false;
		   		}
		    
		    funcHTTP($http, "POST", subsReportURL, $scope.formData, succFunc, failFunc, errFunc);
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
function saveReport($scope){
	var jsonVal = {
		email: $scope.email
	};
	
	return jsonVal;
}
