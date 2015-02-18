'use strict';

var calSetupApp = angular.module('calSetupApp', ['ui.bootstrap','ngAnimate']);

var OPTIONAL = "[Optional]";
var MANDATORY = "[Mandatory]";
var MAX = 50;
var MAX_TIME = 16;

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
		$scope.abookings = 1;
		$scope.tooltiptype = "focus";
		$scope.minDate = startD;
		
	    startD.setMinutes( 0 );		
		endD.setMinutes( 30 );
		

		$scope.word = /^([A-Z|a-z|0-9]+\s{0,1}[A-Z|a-z|0-9]*)*$/;
		/*Default values[E]*/
		
		/*setAdditionalButton[S]*/
		$scope.opt_ctcNo = OPTIONAL;
		$scope.optCtcNo = function(){
			$scope.opt_ctcNo = ($scope.opt_ctcNo == OPTIONAL ? MANDATORY : OPTIONAL); 
		}
		$scope.opt_email = OPTIONAL;
		$scope.optEmail = function(){
			$scope.opt_email = ($scope.opt_email == OPTIONAL ? MANDATORY : OPTIONAL);
		}
		$scope.opt_addr = OPTIONAL;
		$scope.optAddr = function(){
			$scope.opt_addr = ($scope.opt_addr == OPTIONAL ? MANDATORY : OPTIONAL);
		}
		/*setAdditionalButton[E]*/
		
		$scope.addBlackouts = function() {
			var bd = $scope.blackoutdates;
			if(typeof bd !== 'undefined'){
				var timeBD = (Date.UTC(bd.getFullYear(),bd.getMonth(),bd.getDate(),0,0,0));
				if($scope.blackoutEvents.indexOf(timeBD) < 0 && 
						maxLength("Blackout",$scope.blackoutEvents)){
					$scope.blackoutEvents.push(timeBD);
					$scope.blackoutEvents.sort();
				}
			}
		};
		$scope.removeBlackouts = function(idx) {
			$scope.blackoutEvents.splice(idx,1);
		}
		$scope.addReserve = function() {
			var rd = $scope.reserveDates;
			if(typeof rd !== 'undefined'){
				
				var timeRD = (Date.UTC(rd.getFullYear(),rd.getMonth(),rd.getDate(),0,0,0));
				if( $scope.reservedEvents.indexOf(timeRD) < 0 && 
						maxLength("Reserve",$scope.reservedEvents)){
					$scope.reservedEvents.push(timeRD);
					$scope.reservedEvents.sort();
				}
			}
		};
		$scope.removeReserve = function(idx) {
			$scope.reservedEvents.splice(idx,1);
		}
		$scope.addTimeEvents = function() {
			
			if($scope.timedEvents.length > MAX_TIME){
				alert("Maximum Booking Time allowed.")
				return;
			}
			
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
		
		function maxLength(msg, event){
			if(event.length >= MAX){
				alert(msg +" events at it's Max! Which is "+MAX+".");
				return false;
			}
			return true;
		}
		
		function resetupTime(){
			var newTimeEvent = [];
			
			if($scope.fullday){
				newTimeEvent.push({
					"stime":"0",
					"etime":"0",
					"abookings":$scope.abookings
				});
			}else{
				for(var loop = 0; loop<$scope.timedEvents.length; loop++){
					var timeEvent = {
						"stime": obtainTime($scope.timedEvents[loop].stime),
						"etime": obtainTime($scope.timedEvents[loop].etime),
						"abookings":$scope.timedEvents[loop].abookings,
					}
					newTimeEvent.push(timeEvent);
				}
			}
			return newTimeEvent;
		}
		
		function setupData(){
			var data = {
				"title": $scope.title,
				"desc": $scope.desc,
				"userInfo" : userInfoFunc($scope),
				"fullDay": $scope.fullday? true:false,
				"timedEvents": resetupTime(),
				"reserveType": $scope.reserveType,
				"occurrence": [$scope.monday? true:false,$scope.tuesday? true:false,$scope.wednesday? true:false,
							$scope.thursday? true:false,$scope.friday? true:false,
							$scope.saturday? true:false,$scope.sunday? true:false],
				"reserveEvents" : $scope.reservedEvents,
				"blackoutEvents" : $scope.blackoutEvents
			}
			return data;
		}
		
		/**DialogBox[S]**/
	    $scope.open = function (status) {
	    	 var modalInstance = $modal.open({
	    	 templateUrl: 'popupdialog.html',
	    	 controller: 'ModalInstanceCtrl',
	    	 backdrop: 'static',
	    	 resolve: {
	    		 status: function(){
	    		 return status;
	    	 }}
	    	 });
	    	 
	    	 modalInstance.result.then(function (status){
	    		 if(status == 'resetMe'){
	    			$scope.setup.submitted = false;
	    			$scope.flag = false;
	    			$scope.blackoutEvents = [];
	    			$scope.reservedEvents = [];
	    			$scope.timedEvents = [];
	    		 }
	    	 });
	    }
	    /**DialogBox[E]**/
	    
	    /**Compare time[S]**/
	    $scope.invalidTimeComparer = function (idx){
	    	if($scope.timedEvents[idx].etime.getTime() <= $scope.timedEvents[idx].stime.getTime()){
	    		$("#time"+idx).css("border-color","#f00");
	    		return true;
	    	}else{
	    		$("#time"+idx).css("border-color","#000");
	    		return false;
	    	}
	    }
	    /**Compare time[E]**/
	    
	    /**Reset form[S]**/
		$scope.resetForm = function(){
			$scope.open("reset");
		}
	    /**Reset form[E]**/
		
		/**Reset form[S]**/
		$scope.returnForm = function(){
			location.href=homeURL;
		}
	    /**Reset form[E]**/
	    
	    /**Setup confirmation [S]**/
		$scope.processForm = function(){
			
			$scope.setup.submitted = true;
		
			if ($scope.flag) {
		        return;
		    }
			
			if(validForm() == false){
				$scope.flag = false;
				$scope.open('nak');
				location.href="#";
				return;
			}
		    
		    $scope.flag = true;
		    
		    $scope.formData = setupData();
	    	
		    var succFunc = function(data){location.href = setupConfLocation;}
		    var failFunc = function(data){
		    	$scope.open('nak');
		    	$scope.flag = false;}
		    var errFunc = function(data){
		    	$scope.errors = data.errors;
		    	$scope.flag = false;}
		    
		    funcHTTP($http, "PUT", calendarURL, $scope.formData, succFunc, failFunc, errFunc);
	    	
		}
		/**Setup confirmation [E]**/
		 
		function validatecheckbox(val){
			return (typeof val !== 'undefined') && val 
		}
		
		function validForm(){
			if($scope.setup.$valid
					&& ($scope.reserveType=="opt2" && (validatecheckbox($scope.monday)||
							validatecheckbox($scope.tuesday)||
							validatecheckbox($scope.wednesday)||
							validatecheckbox($scope.thursday)||
							validatecheckbox($scope.friday)||
							validatecheckbox($scope.saturday)||
							validatecheckbox($scope.sunday)) 
							|| $scope.reservedEvents.length > 0)
					&& ($scope.fullday || ($scope.timedEvents.length > 0 && validDates()))
			){

				
				return true;
			}else{;
				return false;
			}
		}
		
		function validDates(){
			var timeEvents = $scope.timedEvents;
			for(var loop=0; loop < timeEvents.length; loop++){
				if($scope.invalidTimeComparer(loop)) return false
			}
			return true;
		}
	}
]);

/**Pop up dialog[S]**/
calSetupApp.controller('ModalInstanceCtrl', function ($scope, $modalInstance, status) {
  $scope.status = status;
  
  if($scope.status == 'ok'){
	  $scope.statMsg = "Your Data Has Been Created.";
  }else if($scope.status == 'nak'){
	  $scope.statMsg = "Please Check For Errors.";
  }else if($scope.status == 'reset'){
	  $scope.statMsg = "Are you sure you want to reset?";
  }else{
	  $scope.status = 'others';
	  $scope.statMsg = "Problem Accepting your input. Check again!";
  }
	
  $scope.ok = function () {
	
	if(status == 'reset'){
		$modalInstance.close('resetMe');
	}else if(status == 'nak'){
		//do nothing.
		$modalInstance.close();
	}else{
		$modalInstance.close();
		location.href = setupConfLocation;	
	}
  };
  $scope.reset = function () {
	$modalInstance.close();
  };
});
/**Pop up dialog[E]**/

/**Additional Info parser[S]**/
function userInfoFunc($scope){
	var contact_val, email_val, addr_val = 0;
	if($scope.add_ctcNo)
		$scope.opt_ctcNo==OPTIONAL? contact_val = 1: contact_val = 2;
	if($scope.add_email)
		$scope.opt_email==OPTIONAL? email_val = 1: email_val = 2;
	if($scope.add_addr)
		$scope.opt_addr==OPTIONAL? addr_val = 1: addr_val = 2;
	return switcherCal(
		chkDef(email_val), chkDef(contact_val), chkDef(addr_val)
		);
}
function chkDef(val){
	return (typeof val === 'undefined'? 0: val);
}
function switcherCal(email, contact, addr){
	var calc = 0;
	calc += (3) * email;
	calc += (9) * contact;
	calc += (27) * addr;
	return calc;
}
/**Additional Info parser[E]**/

function obtainDate(date){
	return moment(date).format("MMM Do, YYYY");
}

function obtainTime(time){
	return moment(time).format("HHmm");
}

