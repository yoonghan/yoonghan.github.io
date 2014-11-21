var calSetupConfApp = angular.module('calSetupConfApp', ['ui.bootstrap','ngAnimate', 'calFilters']);
var calSetupConfURL = "http://localhost:9000/tools/calendarconf";
var month=["January","February","March","April","May","June","July","August","September","October","November","December"];
var nextLocation = "http://localhost:8000/selfservice/booking/calendar"; 

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
	    $scope.minDate = new Date();
	    $scope.maxDate = new Date();
	    
	    $scope.events = [];
	    
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
		$scope.open = function($event) {
			$event.preventDefault();
		    $event.stopPropagation();

		    $scope.opened = true;
		};
		  $scope.dateOptions = {
		    formatYear: 'yy',
		    startingDay: 1
		  };
		/**DialogBox[S]**/
	    $scope.open = function (status) {
	    	 var modalInstance = $modal.open({
	    	 templateUrl: 'myModalContent.html',
	    	 controller: 'ModalInstanceCtrl',
	    	 backdrop: 'static',
	    	 resolve: {status: function(){
	    		 return status;
	    	 }}
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
  $scope.status = status=='ok'?true:false;
  if($scope.status){
	  $scope.statMsg = "Status Confirmed."
  }else{
	  $scope.statMsg = "Problem Accepting your input. Check again."
  }
	
  $scope.ok = function () {
	$modalInstance.close();
	location.href = nextLocation;
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