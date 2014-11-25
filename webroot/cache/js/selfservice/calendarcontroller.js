/**
 * calendarDemoApp - 0.1.3
 */

/**Init [S]**/
var reservationURL = 'http://localhost:9000/tools/reserve';
var calendarURL = 'http://localhost:9000/tools/calendar';
var calsetupURL = '/selfservice/booking/setup';
var ws = new WebSocket("ws://localhost:9000/tools/weatherinfo");
var profileURL = 'http://localhost:9000/user/profile';
var redirectURL = "http://login.jomjaring.com";
initWebSocket(ws);
/**Init [E]**/

var calendarApp = angular.module('calendarApp', ['ui.calendar', 'ui.bootstrap']);

calendarApp.config(['$httpProvider', function($httpProvider) {
	  $httpProvider.defaults.withCredentials = true;
	  $httpProvider.defaults.useXDomain = true;
}])

calendarApp.controller('calendarCtrl', ['$scope', '$http', '$modal', '$compile',
    function ($scope, $http, $modal, $compile) {
	
	/**Retrieve user profile[S]**/
	$http.get(profileURL).success(function(data){
		$scope.fstName = data.firstName;
		$scope.lstName = data.lastName;
		$scope.state = data.state;

		//TODO: Handle if we cannot get user info.
		sendMessage($scope.state,(new Date().getTime()));
    }).error(function(data, status) {
        if(status == 401){
        	location.href=redirectURL;
        }
    });
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
    
    /**Tooltip - TODO: To make it work[S]**/
    $scope.eventRender = function( event, element, view ) { 
        element.attr({'tooltip': event.title,
                     'tooltip-append-to-body': true});
        $compile(element)($scope);
    };
    /**Tooltip - TODO: To make it work[E]**/
    
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
    $scope.open = function (status) {
    	 var modalInstance = $modal.open({
    	 templateUrl: 'myModalContent.html',
    	 controller: 'ModalInstanceCtrl',
    	 resolve: {status: function(){
    		 return status;
    	 }}
    	 });
    }
    /**DialogBox[E]**/
    
    /**Booking clicked**/
    $scope.ok = function(id){
    	$scope.confirmBooking("POST", id);
    }
    
    /**Cancellation clicked**/
    $scope.cancel = function(id){
    	$scope.confirmBooking("DELETE", id);
    }
    
    /**Add setup link.**/
    $scope.goToSetupLink = function(){
    	location.href = calsetupURL;
    }
    
    /**booking confirmation [S]**/
    $scope.confirmBooking = function(method, id){
    	
	    if ($scope.flag) {
	        return;
	    }
	    
	    $scope.flag = true;
		$scope.formData = {_id: id};
		    	
    	$http({
	        method  : method,
	        url     : reservationURL,
	        data    : $scope.formData,  // pass in data as strings
	        headers: {'Content-Type': 'application/json'}
	    })
        .success(function(data) {
            $scope.flag = false;
            if (data.success) {
            	$scope.currEvents=[];
            	$scope.myCalendar.fullCalendar( 'refetchEvents' );
            	$scope.open('ok');
            }else{
            	$scope.open('nak');
            }
        })
        .error(function(data){
        	$scope.flag = false;
        });
    }
    /**booking confirmation [E]**/
    
    /* event sources array*/
    $scope.eventSources = [$scope.events,$scope.reservedEvents];
    
}]);

/**Pop up dialog[S]**/
calendarApp.controller('ModalInstanceCtrl', function ($scope, $modalInstance, status) {
  $scope.status = status=='ok'?true:false;
  if($scope.status){
	  $scope.statMsg = "Status Confirmed."
  }else{
	  $scope.statMsg = "Booking Not Accepted."
  }
	
  $scope.ok = function () {
	$modalInstance.close();
  };
});
/**Pop up dialog[E]**/


function obtainDate(date, idx){
	switch(idx){
	case 0:
		return moment(date).format("MMM Do, YYYY hh:mm");
		break;
	case 1:
		return moment(date).format("MMM Do, YYYY");
		break;
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