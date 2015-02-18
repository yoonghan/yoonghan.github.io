"use strict";
/**
 * calendarDemoApp - 0.1.3
 */

/**Init [S]**/
var ws = new WebSocket("ws://localhost:9000/tools/weatherinfo");
initWebSocket(ws);
/**Init [E]**/

var calendarApp = angular.module('calendarApp', ['ui.calendar', 'ui.bootstrap','ngSanitize']);

calendarApp.config(['$httpProvider', function($httpProvider) {
	  $httpProvider.defaults.withCredentials = true;
	  $httpProvider.defaults.useXDomain = true;
}])

calendarApp.controller('calendarCtrl', ['$scope', '$http', '$modal', '$compile', '$location',
    function ($scope, $http, $modal, $compile, $location) {
	
	/**Tutorial[S]**/
	tutorialInit($scope, $location)
	/**Tutorial[E]**/
	
	/**Initial[S]**/
//	$scope.goSettings = function(){
//		window.location.href=settingsURL;
//	}
	/**Initial[E]**/
	
	/**Retrieve user profile[S]**/
	var profileFunc = function(data){
		$scope.fstName = data.firstName;
		$scope.lstName = data.lastName;
		$scope.email = data.email;
		$scope.contactNo = data.contactNo;
		$scope.addr = data.address;
		$scope.postCode = data.postCode;
		$scope.state = data.state;

		//get all states
		$http.get('/cache/json/mlystate.json').success(function(data){
			$scope.states = data;
		});
		
		//TODO: Handle if we cannot get user info.
		sendMessage($scope.state,(new Date().getTime()));
	}
	
	$scope.allowSetup = cookieAccess("Cal_Ctrl");
	
	
	getHTTP($http, userProfileURL, profileFunc);
	
	/**Retrieve user profile[E]**/
	
	/**Obtain user's date[S]**/
	var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();
    $scope.flag = false;
    /**Obtain user's date[E]**/

    /**Define Events[S]**/
    //temporary event is saved here.    
    $scope.currEvents = [];	
    $scope.events = {
    		url:calendarURL,
    		className: 'btn',
    		xhrFields: {
    			withCredentials: true
    		}
    };
    
    $scope.reservedEvents = {
    		url: reservationURL,
            textColor: 'black',
            color: '#dff0d8',
    		className: 'btn',
    		xhrFields: {
    			withCredentials: true
    		}
    };

    /**Define Events[E]**/

    /**Each event clicks[S]**/
    $scope.alertOnEventClick = function( event, allDay, jsEvent, view ){
		sendMessage($scope.state,(new Date(event.start).getTime()));
		$scope.currEvents = []; //clean it.
		var currentContent = {
				title: event.title,
				start: new Date(event.start),
				end: new Date(event.end),
				allDay: event.allDay,
				desc: event.desc,
				booked: ($(this).css('color')=="rgb(0, 0, 0)"),
				userInfo: (typeof event.userInfo === 'undefined')? 0:event.userInfo,
				id: event._id
						};
		$scope.currEvents.push(currentContent);
    };
    /**Each event Clicks[E]**/
    
    /**Date selections[S]**/
    $scope.alertEventOnClick = function( date, allDay, jsEvent, view ){
       sendMessage($scope.state,date);
    };
    /**Date selections[E]**/
        
    /**Add new activities[S]**/
    $scope.addEvent = function() {
    	//Disabled. Never did work well in this version
    };
    /**Add new activities[E]**/
    
    /**Change to view month/day/week[S]**/
    $scope.changeView = function(view,calendar) {
      $scope.myCalendar.fullCalendar('changeView',view);
    };
    /**Change to view month/day/week[E]**/
    
    /**Tooltip[S]**/
    $scope.eventRender = function( event, element, view ) { 
        element.attr({'tooltip': event.title,
                     'tooltip-append-to-body': true});
        $compile(element)($scope);
    };
    /**Tooltip[E]**/
    
    /**UI Configuration[S]**/
    $scope.uiConfig = {
      calendar:{
        height: 450,
        editable: false,
        ignoreTimezone: false,
        header:{
          left: 'title',
          center: '',
          right: 'today prev,next'
        },
		dayClick: $scope.alertEventOnClick,
        eventClick: $scope.alertOnEventClick,
        eventRender: $scope.eventRender
      }
    };
    /**UI Configuration[E]**/
    
    /**DialogBox[S]**/
    $scope.open = function (status, message) {
    	
    	if(typeof message === "undefined") message="";
    	
    	 var modalInstance = $modal.open({
    	 templateUrl: 'popupdialog.html',
    	 controller: 'ModalInstanceCtrl',
    	 resolve: {
    		 status: function(){
    			 return status;
    		 },
    		 message: function(){
        		 return message;
    		 }
    	 }
    	 });
    }
    /**DialogBox[E]**/
    
    /**DialogBox Ver 2[S]**/
    $scope.openVer2 = function (userInfo, id, email, contactNo, addr, postCode, state, errors) {
    	if(typeof userInfo === 'undefined') userInfo = 0;
    	
    	 var modalInstance = $modal.open({
    	 templateUrl: 'usercontent.html',
    	 controller: 'ModalUserReqCtrl',
    	 backdrop: 'static',
    	 resolve: {
    		 errors: function(){
    			 return (typeof errors==='undefined')?[]:errors;
    		 },
    		 id: function(){
    			 return id;
    		 },
    		 userInfo: function(){
    			 return userInfo;
    		 },
	   	 	 email: function(){
	   	 		 return email; 
	   	 	 },
	   	 	 contactNo: function(){
	   	 		 return contactNo; 
	   	 	 },
	   	 	 addr: function(){
	   	 		 return addr; 
	   	 	 },
	   	 	 postCode: function(){
	   	 		 return postCode; 
	   	 	 },
	   	 	 state: function(){
	   	 		 return state; 
	   	 	 },
	   	 	 listStates: function(){
	   	 		 return $scope.states;
	   	 	 }
    	 }
    	 });
    	 
    	 modalInstance.result.then(function (formData) {
	    		 if(typeof formData != 'undefined')
	    			 $scope.confirmBooking("POST", formData);
    	    }, function () {});
    	 
    	 
    }
    /**DialogBox Ver 2[E]**/
    
    /**Booking clicked**/
    $scope.ok = function(id, userInfo){
    	if(userInfo == 0)
    		$scope.confirmBooking("POST", {_id: id, userInfo: 0});
    	else
    		$scope.openVer2(userInfo, id, $scope.email, $scope.contactNo, $scope.addr, $scope.postCode, $scope.state);
    }
    
    /**Cancellation clicked**/
    $scope.cancel = function(id){
    	$scope.confirmBooking("DELETE", {_id: id});
    }
    
    /**booking confirmation [S]**/
    $scope.confirmBooking = function(method, formData){
    	
	    if ($scope.flag) {
	        return;
	    }
	    
	    $scope.flag = true;
	    
	    $scope.formData = formData
		
		var succFunc = function(data){
			$scope.flag = false;
			$scope.currEvents=[];
        	$scope.myCalendar.fullCalendar( 'refetchEvents' );
        	$scope.open('ok');
		}
	    var failFunc = function(data){
	    	$scope.flag = false;
	    	$scope.open('nak', data.error);
	    }
	    var errFunc = function(data){
	    	$scope.flag = false;
	    	if(method == "POST" || formData.userInfo !=0){
	    		$scope.openVer2(formData.userInfo, formData._id, formData.email, formData.contactNo, formData.address, formData.postCode, formData.state, data.errors);
	    	}else{
    			$scope.open('nak', data.error !== 'undefined' ? data.error : "Internal Server Error, please try again.");
	    	}
	   	}
	    
	    funcHTTP($http, method, reservationURL, $scope.formData, succFunc, failFunc, errFunc);
    }
    /**booking confirmation [E]**/
    
    /* event sources array - hack*/
    if($scope.tutorialRun){
    	$scope.tutEvents = [];
    	$scope.eventSources = [$scope.tutEvents];
    }else{
    	$scope.eventSources = [$scope.events,$scope.reservedEvents];
    }
    
}]);

/**Pop up dialog[S]**/
calendarApp.controller('ModalInstanceCtrl', function ($scope, $modalInstance, status, message) {
  $scope.status = status=='ok'?true:false;
 
  if($scope.status){
	  $scope.statMsg = "Status Confirmed."
  }else{
	  $scope.statMsg = message==""?"Booking Not Accepted.":message;
  }
	
  $scope.ok = function () {
	$modalInstance.close();
  };
});

calendarApp.controller('ModalUserReqCtrl', function ($scope, $modalInstance, errors, id, userInfo, email, contactNo, addr, postCode, state, listStates) {

	/**Check availability[S]**/
	$scope.checkUserInfo = function(action){
		
		var ternary = $scope.userInfo.toString(3);
		var position = -1;
		
		switch(action){
		case "Email":
			position = ternary.length-2;
			break;
		case "ContactNo":
			position = ternary.length-3;
			break;
		case "Address":
			position = ternary.length-4;
			break;	
		}

		return position < 0? 0 : parseInt(ternary.charAt(position),10);
	}
	
	var isActValid = function(action){
		return ($scope.checkUserInfo(action) == 0 ? false : true);
	}
	
	$scope.isReq = function(action){
		return ($scope.checkUserInfo(action) == 2 ? true : false);
	}
	/**Check availability[E]**/
	
	/**Initialize[S]**/
	$scope.postalCd = /^[1-9][0-9]{0,4}$/;
	$scope.number = /^\+?[0-9]{0,13}$/;
	
	$scope.userInfo = userInfo;
	$scope.dtl_email = email;
	$scope.dtl_ctcNo = contactNo;
	$scope.dtl_addr = addr;
	$scope.dtl_pstCd = postCode;
	$scope.states = listStates;
	if(errors.length != 0)
		$scope.errors =  errors;
	else
		$scope.errors =  undefined;
	
	//Complex to select state, thanks to Angular :(
	var jsonState=eval("({'id':'"+state+"'})");
	$scope.dtl_state = $scope.states[_.findIndex($scope.states, jsonState)];
	
	
	$scope.isEmailShow = isActValid("Email");
	$scope.isContactNoShow = isActValid("ContactNo");
	$scope.isAddressShow = isActValid("Address");
	/**Initialize[E]**/
	
	$scope.dtl_ok = function () {
		if($scope.detail.$valid){
			var formData = {
				_id: id,
				userInfo: $scope.userInfo,
				state: $scope.dtl_state.id,
				postCode: $scope.dtl_pstCd,
				address: $scope.dtl_addr,
				email: $scope.dtl_email,
				contactNo: $scope.dtl_ctcNo
			};
			
			if($scope.isEmailShow == false)
				delete formData.email;
			if($scope.isContactNoShow == false)
				delete formData.contactNo;
			if($scope.isAddressShow == false){
				delete formData.address;
				delete formData.postCode;
				delete formData.state;
			}
			
			$modalInstance.close(formData);
		}
	    
	};
	$scope.dtl_cancel = function () {
		$modalInstance.close();
	};
});
/**Pop up dialog[E]**/

function obtainDate(date, idx){
	switch(idx){
	case 0:
		return moment(date).format("MMM Do, YYYY hh:mm");
	case 1:
		return moment(date).format("MMM Do, YYYY");
	}
}

function obtainDay(date){
	return moment(date).format("DD");
}

/**Web socket only[S]**/
function initWebSocket(ws){
	ws.onmessage = function( event ){
		var receivedJson = JSON.parse(event.data);
		var icon = Skycons.UNKNOWN;

		switch(receivedJson.icon){
			case "clear-day":
				icon = Skycons.CLEAR_DAY;
				break;
			case "clear-night":
				icon = Skycons.CLEAR_NIGHT;
				break; 
			case "rain":
				icon = Skycons.RAIN;
				break;
			case "snow":
				icon = Skycons.SNOW;
				break;
			case "sleet":
				icon = Skycons.SLEET;
				break;
			case "wind":
				icon = Skycons.WIND;
				break;
			case "fog":
				icon = Skycons.FOG;
				break;
			case "cloudy":
				icon = Skycons.CLOUDY;
				break;
			case "partly-cloudy-day":
				icon = Skycons.PARTLY_CLOUDY_DAY;
				break;
			case "partly-cloudy-night":
				icon = Skycons.PARTLY_CLOUDY_NIGHT;
				break;
			default:
				icon = Skycons.UNKNOWN;
				break;
		};
		if(icon == Skycons.UNKNOWN){
			skycons.remove("weatherIcon")
		}else{
			skycons.set("weatherIcon", icon);
			$("#weatherMessage").text(receivedJson.summary)
			var date = new Date(eval(receivedJson.date)); 
			$("#weatherDate").text(obtainDate(date, 1));
		}
		
	}
	
	ws.onclose = function(){
		console.log("Connection closed");
	}
}

function waitForSocketConnection(socket, callback){
	setTimeout(
		function(){
			if (socket.readyState === 1) {
				if(callback !== undefined){
					callback();
				}
				return;
			}else {
				waitForSocketConnection(socket,callback);
			}
		}, 5);
};

function sendMessage(state,time) {
    waitForSocketConnection(ws, function() {
    	
        ws.send('{"state":"'+state+'", "date":"'+time+'"}');
    });
};
/**Web socket only[E]**/