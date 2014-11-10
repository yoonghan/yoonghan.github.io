/**
 * calendarDemoApp - 0.1.3
 */

var ws = new WebSocket("ws://localhost:9000/tools/weatherinfo");
initWebSocket(ws);

var calendarApp = angular.module('calendarApp', ['ui.calendar', 'ui.bootstrap']);

calendarApp.config(['$httpProvider', function($httpProvider) {
	  $httpProvider.defaults.withCredentials = true;
	  $httpProvider.defaults.useXDomain = true;
}])

calendarApp.controller('calendarCtrl', ['$scope', '$http', '$modal', '$compile',
    function ($scope, $http, $modal, $compile) {
	
	/**Retrieve user profile[S]**/
	$http.get('http://localhost:9000/user/profile').success(function(data){
		$scope.fstName = data.firstName;
		$scope.lstName = data.lastName;
		$scope.state = data.state;

		//TODO: Handle if we cannot get user info.
		sendMessage('{"state":"'+$scope.state+'", "date":"'+(new Date().getTime())+'"}');
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
    		url:'http://localhost:9000/tools/calendar',
    		className: 'btn',
    		xhrFields: {
    			withCredentials: true
    		}
    };
    
    $scope.reservedEvents = {
    		url:'http://localhost:9000/tools/reserve',
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
		sendMessage('{"state":"'+$scope.state+'", "date":"'+(new Date(event.start).getTime())+'"}');
		$scope.currEvents = []; //clean it.
		var currentContent = {
							title: event.title,
							start: obtainDate(event.start),
							end: obtainDate(event.end),
							desc: event.desc,
							booked: ($(this).css('color')=="rgb(0, 0, 0)"),
							id: event._id
						};
		$scope.currEvents.push(currentContent);
    };
    /**Each event Clicks[E]**/
    
    /**Date selections[S]**/
    $scope.alertEventOnClick = function( date, allDay, jsEvent, view ){
       sendMessage('{"state":"'+$scope.state+'", "date":"'+date+'"}');
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
    	
	    if ($scope.flag) {
	        return;
	    }
	    
	    $scope.flag = true;
		$scope.formData = {_id: id};
		
    	$http({
	        method  : 'POST',
	        url     : 'http://localhost:9000/tools/reserve',
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
    
    /**Booking clicked**/
    $scope.cancel = function(id){
    	
	    if ($scope.flag) {
	        return;
	    }
	    
	    $scope.flag = true;
		$scope.formData = {_id: id};
		
    	$http({
	        method  : 'DELETE',
	        url     : 'http://localhost:9000/tools/reserve',
	        data    : $scope.formData,  // pass in data as strings
	        headers: {'Content-Type': 'application/json'}
	    })
        .success(function(data) {
            if (data.success) {
            	$scope.flag = false;
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
    
    /* event sources array*/
    $scope.eventSources = [$scope.events,$scope.reservedEvents];    
}]);

/**Pop up dialog[S]**/
calendarApp.controller('ModalInstanceCtrl', function ($scope, $modalInstance, status) {
  $scope.status = status=='ok'?true:false;
  if($scope.status){
	  $scope.statMsg = "Booking Accepted."
  }else{
	  $scope.statMsg = "Booking Not Accepted."
  }
	
  $scope.ok = function () {
	$modalInstance.close();
  };
});
/**Pop up dialog[E]**/


function obtainDate(date){
	return moment(date).format("MMM Do, YYYY");
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
			$("#weatherDate").text(obtainDate(date));
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

function sendMessage(msg) {
    waitForSocketConnection(ws, function() {
        ws.send(msg);
    });
};
/**Web socket only[E]**/