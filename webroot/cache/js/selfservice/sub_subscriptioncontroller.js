var subsHostListURL = "http://localhost:9000/subscription/hosts";

/**
 * Subscription controller
 */
settingApp.controller('SubscriptionCtrl', ['$scope', '$http', '$modal', '$routeParams',
      function($scope, $http, $modal, $routeParams) {
	
		/**Init[S] **/
		$scope.predicate = "cName";
		$scope.reverse = false;
		/**Init[E] **/
	
		/**Retrieve user profile[S]**/
		var hostListFunc = function(data){
			$scope.subHostList = data;
			$scope.chkHostList = [];
			for(var i=0; i < $scope.subHostList.length; i++){
				var currElem = $scope.subHostList[i];
				
				$scope.chkHostList.push({
					_id: currElem._id,
					cDesc: currElem.cDesc,
					cName: currElem.cName,
					initStat: currElem.subscribed,
					currStat: currElem.subscribed,
					});
			}
			$scope.subHostList = null;
		}
		
		getHTTP($http, subsHostListURL, hostListFunc);
		/**Retrieve user profile[E]**/
   	
		/**Save user profile[S]**/
		$scope.save = function(){

			if ($scope.flag) {
		        return;
		    }

			$scope.flag = true;
			$scope.formData = saveSubscription($scope);
			
			$http({
		        method  : 'POST',
		        url     : subsHostListURL,
		        data    : $scope.formData,  // pass in data as strings
		        headers: {'Content-Type': 'application/json'}
		    })
		    .success(function(data) {
		        if (data.success) {
		        	switchStatus($scope);
		        	$scope.open();
		        }else{
		        	$scope.errors = "We encounted exception, please try again."
		        }
		        $scope.flag = false;
		    })
		    .error(function(data, status){
		    	errorAction(status);
		    	$scope.errors = data.errors;
		    	$scope.flag = false;
		    });
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

//Created so that updated status is corrected
function switchStatus($scope){
	for(var i=0; i < $scope.chkHostList.length; i++){
		var currElem = $scope.chkHostList[i];
		currElem.initStat = currElem.currStat;
	}
}

function saveSubscription($scope){
	
	var subList = [];
	var unsubList = [];
	for(var i=0; i < $scope.chkHostList.length; i++){
		var currElem = $scope.chkHostList[i];
		
		if(currElem.currStat != currElem.initStat){	//if there is only changes
			if(currElem.currStat == true){
				subList.push(currElem._id.$oid);
			}
			if(currElem.currStat == false){
				unsubList.push(currElem._id.$oid);
			}
		}
	}
	
	var returnval = {
		subs: subList,
		unsubs: unsubList,
	}
	
	return returnval;
	
}

settingApp.controller('ModalInstanceCtrl', function ($scope, $modalInstance) {  
  $scope.ok = function () {
	$modalInstance.close();
  };
});