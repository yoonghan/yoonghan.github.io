var calSetupConfApp = angular.module('calSetupConfApp', ['ui.bootstrap','ngAnimate', 'calFilters']);
var calSetupConfURL = "http://localhost:9000/tools/calendarconf";
var month=["January","February","March","April","May","June","July","August","September","October","November","December"];
var nextLocation = "/selfservice/booking/calendar"; 

calSetupConfApp.config(['$httpProvider', function($httpProvider) {
	  $httpProvider.defaults.withCredentials = true;
	  $httpProvider.defaults.useXDomain = true;
}]);

angular.module('calFilters', []).filter('calfilter', function() {
	  return function(input) {
		var d = new Date(eval(input));
	    return d.getFullYear() + " / " + month[d.getMonth()];
	  };
	});

calSetupConfApp.controller('calSetupCtrl', ['$scope', '$http',  '$modal', 
    function ($scope, $http, $modal) {
	    var startD = new Date();
	    var endD = new Date();
	    
	    /**Setup [S]**/
	    $scope.minDate = new Date();
	    $scope.maxDate = new Date();
	    $scope.word = /^([A-Z|a-z|0-9]+\s{0,1}[A-Z|a-z|0-9]*)*$/;
	    $scope.events = [];
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
				$http.get(calSetupConfURL+"/0/0").success(function(data){
					$scope.events = data;
					$scope.groupEvents = _.groupBy($scope.events, function(num){ var d = new Date(num.start); var date = (new Date(d.getFullYear(), d.getMonth(), 1, 0, 0, 0, 0)); return date.getTime();});
			    }).error(function(data, status) {
			        if(status == 401){
			        	location.href=redirectURL;
			        }
			    });	
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
		    	 templateUrl: 'popupdialog.html',
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
	    	$scope.open("reset");
	    }
	    
		$scope.processForm = function(){
			if ($scope.flag) {
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
	}
]);

/**Pop up dialog[S]**/
calSetupConfApp.controller('ModalInstanceCtrl', function ($scope, $modalInstance, status) {
  $scope.status = status;
  if(status == "ok"){
	  $scope.statMsg = "Status Confirmed."
  }else if(status == "reset"){
	  $scope.statMsg = "Reload values? Current value will be resetted."
  }else if(status == "reject"){
	  $scope.statMsg = "Remove all values? All values will be deleted."
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