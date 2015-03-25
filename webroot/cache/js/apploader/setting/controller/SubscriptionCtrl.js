define(['app','modalInstance'], function (app) {
    app.controller('SubscriptionCtrl', function($scope, $http, $modal, $routeParams) {
	
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
					ext: currElem.ext,
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
			
			var succFunc = function(data){
				switchStatus($scope);
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
		    
		    funcHTTP($http, "POST", subsHostListURL, $scope.formData, succFunc, failFunc, errFunc);
		}
		/**Save user profile[E]**/
		
		/**Cancel button[S]**/
		$scope.cancel = cancelBtn;
		/**Cancel button[E]**/
		
		/**Open Modal[S]**/
		$scope.open = function () {
		   var modalInstance = $modal.open({
		     templateUrl: 'popupdialog.html',
		     controller: 'ModalInstanceCtrl',
		     backdrop: 'static',
		     resolve: {}
		   });
		};
		/**Open Modal[E]**/
		
		/**Open Modal[S]**/
		$scope.imageURL = cpImageURL;
		/**Open Modal[E]**/
    });

//Created so that updated status is corrected
    function switchStatus($scope){
        for(var i=0; i < $scope.chkHostList.length; i++){
            var currElem = $scope.chkHostList[i];
            currElem.initStat = currElem.currStat;
        }
    }

    function saveSubscription($scope){

        if(typeof $scope.chkHostList === 'undefined'){
            return;
        }

        var subList = [];
        var unsubList = [];
        for(var i=0; i < $scope.chkHostList.length; i++){
            var currElem = $scope.chkHostList[i];

            if(currElem.currStat != currElem.initStat){
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
});