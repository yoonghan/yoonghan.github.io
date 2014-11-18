var calSetupApp = angular.module('calSetupApp', ['ui.bootstrap','ngAnimate']);
var reservationURL = "http://localhost:9000/tools/calendar";

calSetupApp.config(['$httpProvider', function($httpProvider) {
	  $httpProvider.defaults.withCredentials = true;
	  $httpProvider.defaults.useXDomain = true;
}])

calSetupApp.controller('calSetupCtrl', ['$scope', '$http',  '$modal', 
    function ($scope, $http, $modal) {
	    var startD = new Date();
	    var endD = new Date();
	    $scope.blackoutEvents = [];
	    $scope.reservedEvents = [];
	    $scope.timedEvents = [];
	    
	    /*Default values[S]*/
	    $scope.flag = false;
	    $scope.reserveType = "opt1";
	    $scope.hstep = 1;
		$scope.mstep = 30;
		
			    	    
	    startD.setMinutes( 0 );
		
		endD.setMinutes( 30 );
		
		/*Default values[E]*/
		
		$scope.addBlackouts = function() {
			var bd = $scope.blackoutdates;
			if(bd != undefined && $scope.blackoutEvents.indexOf(bd.getTime()) < 0){
				$scope.blackoutEvents.push(bd.getTime());
				$scope.blackoutEvents.sort();
			}
		};
		$scope.removeBlackouts = function(idx) {
			$scope.blackoutEvents.splice(idx,1);
		}
		$scope.addReserve = function() {
			var rd = $scope.reserveDates;
			if(rd != undefined && $scope.reservedEvents.indexOf(rd.getTime()) < 0){
				$scope.reservedEvents.push(rd.getTime());
				$scope.reservedEvents.sort();
			}
		};
		$scope.removeReserve = function(idx) {
			$scope.reservedEvents.splice(idx,1);
		}
		$scope.addTimeEvents = function() {
			var timeEvent = {
					"stime": startD,
					"etime": endD,
					"abookings": 1
			};
			$scope.timedEvents.push(timeEvent);
		};
		$scope.removeTimeEvents = function(idx) {
			$scope.timedEvents.splice(idx,1);
		}
		
		function resetupTime(){
			var newTimeEvent = [];
			for(var loop = 0; loop<$scope.timedEvents.length; loop++){
				var timeEvent = {
					"stime": obtainTime($scope.timedEvents[loop].stime),
					"etime": obtainTime($scope.timedEvents[loop].etime),
					"abookings":$scope.timedEvents[loop].abookings,
				}
				newTimeEvent.push(timeEvent);
			}
			return newTimeEvent;
		}
		
		function setupData(){
			
			var data = {
				"title": $scope.title,
				"desc": $scope.desc,
				"allowBooking": $scope.abookings,
				"fullDay": $scope.fullday? true:false,
				"timedEvents": resetupTime(),
				"reserveType": $scope.reserveType,
				"occurrence": [$scope.monday? true:false,$scope.tuesday? true:false,$scope.wednesday? true:false,
							$scope.thursday? true:false,$scope.friday? true:false,
							$scope.saturday? true:false,$scope.sunday? true:false],
				"reserveEvents" : $scope.reservedEvents,
				"blackoutEvents" : $scope.blackoutEvents
			}
			alert(JSON.stringify(data));
			return data;
		}
		
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
	    
	    /**Setup confirmation [S]**/
		$scope.processForm = function(){
			if ($scope.flag) {
		        return;
		    }
		    
		    //$scope.flag = true;
		    $scope.formData = setupData();
	    	
	    	$http({
		        method  : "PUT",
		        url     : reservationURL,
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
	        	alert("GET ERROR");
	        	$scope.flag = false;
	        });
		}
		/**Setup confirmation [E]**/
	}
]);

/**Pop up dialog[S]**/
calSetupApp.controller('ModalInstanceCtrl', function ($scope, $modalInstance, status) {
  $scope.status = status=='ok'?true:false;
  if($scope.status){
	  $scope.statMsg = "Status Confirmed."
  }else{
	  $scope.statMsg = "Problem Accepting your input. Check again."
  }
	
  $scope.ok = function () {
	$modalInstance.close();
  };
});
/**Pop up dialog[E]**/

function obtainDate(date){
	return moment(date).format("MMM Do, YYYY");
}

function obtainTime(time){
	return moment(time).format("HHmm");
}