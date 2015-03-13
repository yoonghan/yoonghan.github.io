'use strict';

var month=["January","February","March","April","May","June","July","August","September","October","November","December"];

/**
 * Filters
 */
angular.module('calFilters', []).filter('calfilter', function() {
  return function(input) {
	var d = new Date(eval(input));
    return d.getFullYear() + " / " + month[d.getMonth()];
  };
});
angular.module('MainApp', ['ngMaterial','ui.bootstrap','ngMessages','ngRoute','calFilters'])
.factory("calendar",function(){
    return [];
})
.config(function($httpProvider, $routeProvider, $locationProvider, $mdThemingProvider) {
/**Send Cookie [S]**/
	$httpProvider.defaults.withCredentials = true;
	$httpProvider.defaults.useXDomain = true;
/**Send Cookie [E]**/
/**Theme [S]**/
	$mdThemingProvider.theme('default')
		.primaryPalette('blue',{'default':'800'})
		.accentPalette('green',{'default':'500'});
/**Theme [E]**/
/**Routing [S]**/
    $routeProvider
        .when('/home', {
            templateUrl: 'admin/home'
        })
        .when('/settings', {
            templateUrl: 'admin/settings',
            controller: 'SettingsCtrl'
        })
        .when('/events', {
            templateUrl: 'admin/events',
            controller: 'EventsCtrl'
        })
        .when('/userlist/:oid', {
            templateUrl: 'admin/userlist',
            controller: 'UserListCtrl'
        })
        .when('/eventsetup', {
            templateUrl: 'admin/eventsetup',
            controller: 'EventSetupCtrl'
        })
        .when('/eventprogress', {
            templateUrl: 'admin/eventsubmit_p',
            controller: 'EventProgressCtrl'
        })
        .when('/eventsubmit', {
            templateUrl: 'admin/eventsubmit_c',
            controller: 'EventSubmitCtrl'
        })
        .when('/eventempty', {
            templateUrl: 'admin/eventsubmit_e'
        })
        .when('/statistics', {
            templateUrl: 'admin/statistics',
            controller: 'StatisticCtrl'
        })
/**Routing [E]**/
})
.controller('AppCtrl', function($scope, $route, $routeParams, $location, $timeout, $mdSidenav, $mdBottomSheet) {

  $scope.menuList=[
                   {pg:"Events",icon:"glyphicon-tasks",lnk:"#/events"},
                   {pg:"Setup",icon:"glyphicon-wrench",lnk:"#/eventsetup"}
                   ];
  
  var previousPaths=[];
  $scope.$on('$routeChangeSuccess', function() {
	  previousPaths.push($location.$$path);
	  if(previousPaths.length > 2){
		  previousPaths.splice(0,1);
	  }
  });
  
  $scope.back =function(){
	  var path = previousPaths.length > 1 ? previousPaths.splice(-2)[0] : "/home";
	  $location.url(path);
	  }
  
  $scope.showMenu = true;
  
  $scope.md_checkopen = true;

  $scope.toggleMenu = function() {
    $mdSidenav('left').toggle();
  };
  
  $scope.showBottomMenuSheet = function($event) {
    $scope.alert = '';
    $mdBottomSheet.show({
      templateUrl: 'admin/bottom_menu',
      controller: 'BottomMenuCtrl',
      targetEvent: $event
    }).then(function(clickedItem) {
      $scope.alert = clickedItem.name + ' clicked!';
    });
  };
  
  //routing location
  $scope.$route = $route;
  $scope.$location = $location;
  $scope.$routeParams = $routeParams;
    
  $location.url('home');
})
.controller('MenuCtrl', function($scope, $timeout, $mdSidenav) {
  $scope.close = function() {
    $mdSidenav('left').close();
  };
})
.controller('BottomMenuCtrl', function($scope, $location, $mdBottomSheet) {

  $scope.items = [
	{ name: 'Home', icon: 'glyphicon-home', loc:'#/home' },
	{ name: 'Settings', icon: 'glyphicon-wrench', loc:'#/settings' },
	{ name: 'Exit', icon: 'glyphicon-calendar', loc:homeURL },
    { name: 'LogOff', icon: 'glyphicon-remove-sign red', loc:logoutURL }	
  ];
  $scope.listItemClick = function(path) {
    $mdBottomSheet.hide("hi");
    location.href=path;
  };
})
.controller('EventsCtrl', function($scope, $http, $location, calendar) {
	/**Init[S] **/
	$scope.predicate = "start";
	$scope.reverse = false;
	if(calendar.length != 0) {
		calendar.splice(0, calendar.length);
	}
	/**Init[E]**/
	
	/**Retrieve user profile[S]**/
	var bookingListFunc = function(data){
		$scope.bookingList=calendar;
		
		for(var i=0; i < data.length; i++){
			var currElem = data[i];
			var info = {
					start: currElem.start,
					end: currElem.end,
					allDay: currElem.allDay,
					title: currElem.title,
					desc: currElem.desc,
					avail: currElem.avail,
					id: currElem._id,
					conf: currElem.conf,
					close: true,
					info: []
					};
			
			$scope.bookingList.push(info);
		}
		data = null;
	}
	
	getHTTP($http, bookingListURL, bookingListFunc);
	/**Retrieve user profile[E]**/
	
	/**Check reporting allow[S]**/
	var allowReportFunc = function(data){
		var value = data;
		if(typeof data !== 'undefined'){
			if(typeof data.success !== 'undefined'){
				$scope.rpt_allowed = true;
			}
		}
	}
	getHTTP($http, reportURL, allowReportFunc);
	/**Check reporting allow[E]**/
	
	$scope.genReport= function(){
		var succFunc = function(data){
			$scope.rpt_disabled = true;
		}
	    var failFunc = function(data){
	    	$scope.showAlert("error",data.error)
	    }
	    var errFunc = function(data){
	    	$scope.showAlert("error","Please try again later, or inform the admin.")
	   	}
	    
	    funcHTTP($http, "POST", reportGenUrl, {}, succFunc, failFunc, errFunc);
	}
	
	$scope.listUsers = function(id){
		var oid = id.$oid;
		$location.url('userlist/'+oid);
	}
})
.controller('UserListCtrl', function($scope, $route, $routeParams, $http, $timeout, $mdDialog, calendar) {
	/**Init[S] **/
	$scope.predicate = "fname";
	$scope.reverse = false;
	/**Init[E] **/
	
	/**Expose user[S]**/
	var oid = $routeParams.oid;

	var userListFunc = function(data){
		var value = data;		
		$scope.userList = [];
		for(var i=0; i < value.length; i++){
			var currElem = value[i];
			
			$scope.userList.push({
				conf: currElem.conf,
				firstName: currElem.firstName,
				lastName: currElem.lastName,
				email: currElem.email,
				ctcNo: currElem.contactNo,
				id: currElem.maskId
				});
		}
		value = null;
	}

	getHTTP($http, userInfoURL+"/"+oid, userListFunc);
	/**Expose user[E]**/
	
	//Search value and replace
	var jsonCalId=eval("({'id':{'$oid':'"+oid+"'}})");
	
	$scope.calInfo = calendar[_.findIndex(calendar, jsonCalId)];
	//Reuse old scope data[E]
	
	$scope.unsubuser = function(maskId,ev){
		$scope.flag = true;
		var calId = $scope.calInfo.id;
		/**booking confirmation [S]**/
		$scope.formData = {_id: calId, userId: maskId};

		    var confirm = $mdDialog.confirm()
		      .title('Unsubscribe user')
		      .content('Are you sure to remove the user from your reserve list?')
		      .ariaLabel('Good Luck')
		      .ok('Yes')
		      .cancel('No')
		      .targetEvent(ev);
		    $mdDialog.show(confirm).then(function() {
		    	var succFunc = function(data){
		    		$scope.calInfo.avail = $scope.calInfo.avail + 1;
		    		$route.reload();
					}
			    var failFunc = function(data){
			    	$scope.showAlert(ev, data.error);
			    	}
			    var errFunc = function(data){
			    	$scope.showAlert(ev, "Please try again later, or inform the us.");
			   		}
			    
			    funcHTTP($http, "DELETE", cmdreservationURL, $scope.formData, succFunc, failFunc, errFunc);
		    }, function() {
		    });
		    
		$scope.flag = false;
	    /**booking confirmation [E]**/
	}
	
	$scope.confirmuser = function(maskId){
		$scope.flag = true;
		var calId = $scope.calInfo.id;
		/**booking confirmation [S]**/
		var formData = {_id: calId, userId: maskId};
		var succFunc = function(data){
			$route.reload();
			}
	    var failFunc = function(data){
	    	$scope.showAlert("error",data.error)
	    	}
	    var errFunc = function(data){
	    	$scope.showAlert("error",data.error)
	   		}
	    
	    funcHTTP($http, "POST", cmdreservationURL, formData, succFunc, failFunc, errFunc);
		$scope.flag = false;
	    /**booking confirmation [E]**/
	};
	
	$scope.showAlert = function(ev, message) {
		$mdDialog.show(
		  $mdDialog.alert()
		    .title('Opps, Error Encountered')
		    .content(message)
		    .ariaLabel('Error')
		    .ok('Ok!')
		    .targetEvent(ev)
		);
	};
})
.controller('EventSetupCtrl', function($scope, $http, $route, $routeParams, $location, $timeout, $mdDialog) {
	var OPTIONAL = "[Optional]";
	$scope.MAX = 50;
	var MAX_TIME = 16;
	
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
	$scope.minDate = startD;
	
    startD.setMinutes( 0 );		
	endD.setMinutes( 30 );
		
	$scope.word = /^([A-Z|a-z|0-9]+\s{0,1}[A-Z|a-z|0-9]*)*$/;
	/*Default values[E]*/
		
	/*setAdditionalButton[S]*/
	$scope.opt_ctcNo = OPTIONAL;
	$scope.opt_email = OPTIONAL;
	$scope.opt_addr = OPTIONAL;
	/*setAdditionalButton[E]*/
		
	$scope.addBlackouts = function(ev) {
		var bd = $scope.blackoutdates;
		if(typeof bd !== 'undefined'){
			var timeBD = (Date.UTC(bd.getFullYear(),bd.getMonth(),bd.getDate(),0,0,0));
			if($scope.blackoutEvents.indexOf(timeBD) < 0 && 
					maxLength(ev,"Blackout",$scope.blackoutEvents)){
				$scope.blackoutEvents.push(timeBD);
				$scope.blackoutEvents.sort();
			}
		}
	};
	$scope.removeBlackouts = function(idx) {
		$scope.blackoutEvents.splice(idx,1);
	}
	$scope.addReserve = function(ev) {
		var rd = $scope.reserveDates;
		if(typeof rd !== 'undefined'){
			
			var timeRD = (Date.UTC(rd.getFullYear(),rd.getMonth(),rd.getDate(),0,0,0));
			if( $scope.reservedEvents.indexOf(timeRD) < 0 && 
					maxLength(ev,"Reserve",$scope.reservedEvents)){
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
	
	function maxLength(ev,msg, event){
		if(event.length >= $scope.MAX){
			$scope.showAlert(ev,msg +" events at it's Max, which is "+$scope.MAX+".");
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
			"conf" : $scope.conf? true:false,
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
	$scope.showAlert = function(ev, message) {
		$mdDialog.show(
		  $mdDialog.alert()
		    .title('Opps, Error Encountered')
		    .content(message)
		    .ariaLabel('Error')
		    .ok('Ok!')
		    .targetEvent(ev)
		);
	};
    /**DialogBox[E]**/
    
    /**Compare time[S]**/
    $scope.invalidTimeComparer = function (idx){
    	var recolor=angular.element(document.querySelector("#time"+idx));
    	if($scope.timedEvents[idx].etime==null || $scope.timedEvents[idx].stime==null || $scope.timedEvents[idx].etime.getTime() <= $scope.timedEvents[idx].stime.getTime()){
    		recolor.css("border-color","#f00");
    		return true;
    	}else{
    		recolor.css("border-color","#000");
    		return false;
    	}
    }
    /**Compare time[E]**/
    
    /**Reset form[S]**/
	$scope.resetForm = function(ev){
		var confirm = $mdDialog.confirm()
	    .title('Reset Form')
	    .content('You\'ll loose all you input. Are you sure?')
	    .ariaLabel('Reset')
	    .ok('Reset')
	    .cancel('No')
	    .targetEvent(ev);
		  $mdDialog.show(confirm).then(function() {
			$route.reload();
		  }, function() {
		});
	}
    /**Reset form[E]**/
    
    /**Setup confirmation [S]**/
	$scope.processForm = function(ev){
		
		$scope.setup.submitted = true;
	
		if ($scope.flag) {
	        return;
	    }
		
		if(validForm() == false){
			$scope.flag = false;
			$scope.showAlert(ev,"There are errors within your input.");
			$location.href="#/eventsetup";
			return;
		}
	    
	    $scope.flag = true;
	    
	    $scope.formData = setupData();
    	
	    var succFunc = function(data){
	    	$location.url('eventprogress');
	    }
	    var failFunc = function(data){
	    	$scope.showAlert(ev,"There are errors within your input.");
	    	$scope.flag = false;}
	    var errFunc = function(data){
	    	$scope.errors = data.errors;
	    	$scope.flag = false;}
	    
	    funcHTTP($http, "PUT", calendarURL, $scope.formData, succFunc, failFunc, errFunc);
    	
	}
	/**Setup confirmation [E]**/
	 
	function validatecheckbox(val){
		return (typeof val !== 'undefined') && val;
	}
	
	function validForm(){
		if($scope.setup.$valid
				&& ($scope.reserveType=="opt2" && (validatecheckbox($scope.monday)||
						validatecheckbox($scope.tuesday)||
						validatecheckbox($scope.wednesday)||
						validatecheckbox($scope.thursday)||
						validatecheckbox($scope.friday)||
						validatecheckbox($scope.saturday)||
						validatecheckbox($scope.sunday)) || 
						$scope.reservedEvents.length > 0)
				&& ($scope.fullday || ($scope.timedEvents.length > 0 && validDates()))){
			return true;
		}else{
			return false;
		}
	}
	
	function validDates(){
		var timeEvents = $scope.timedEvents;
		for(var loop=0; loop < timeEvents.length; loop++){
			if($scope.invalidTimeComparer(loop)) return false;
		}
		return true;
	}
	
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
})
.controller('EventProgressCtrl', function($scope, $http, $location, $interval, $mdDialog) {
	var amt = 100;
	var maxWait = 2000;
	var maxRetryCount = 25;
	  
	//don't start at 0, user will suspect nothing is working
	  
	$scope.progressValue = -1; 
	$scope.countTo = amt;
	$scope.countFrom = 0;
	 
	$scope.message = "";
	  
	$scope.maxRetryCount = maxRetryCount;
	$scope.retryCount = 0;
	  
	var stop;
	  
	/**Function for progress count[S]**/
	var progressFunc = function(data){
		if ($scope.progressValue < $scope.countTo 
				&& $scope.retryCount < $scope.maxRetryCount
				&& !($scope.progressValue==-1 &&  $scope.retryCount == 2)) {
		  if(data.length != 0){
			  var count = eval(data[0].count);
			  var total = eval(data[0].total);
			  
			  var progress = Math.floor(count/total * amt);
			  $scope.progressValue = progress;  
		  }
		  /**Handles retry**/
			  $scope.retryCount++;
			  if($scope.retryCount > 12){
				  $scope.message = "Umm, something seems strange. But just to let you know, we're still here with you.";
			  }else if($scope.retryCount > 3){
				  $scope.message = "We're still loading, do be patient.";
			  }
			  
		} else {
		  $scope.stopLoad();
		}
	  };
	  /**Function for progress count[E]**/
	  
	  $scope.load = function() {
/**Don't start a new fight if we are already fighting**/
	      if ( angular.isDefined(stop) ) return;
	      
/**load every 2 seconds**/
	      stop = $interval(function() {	    	  
	    	  getHTTP($http, calLoadURL, progressFunc);
	      }, maxWait, maxRetryCount+1); 
	  };
	    
	  $scope.stopLoad = function() {
		  if (angular.isDefined(stop)) {
			  $interval.cancel(stop);
			  stop = undefined;
		  }
		  if($scope.progressValue==-1){
			  $location.url('eventempty');
		  }else{
		      $location.url('eventsubmit');
		  }
	  };
		  
	  $scope.$on('$destroy', function() {
	        // Make sure that the interval is destroyed too
	        $scope.stopLoad();
	  });
	  
	  $scope.load();
})
.controller('EventSubmitCtrl', function($scope, $http, $location, $mdDialog) {
	var startD = new Date();
    var endD = new Date();
    
    /**Setup [S]**/
    $scope.minDate = new Date();
    $scope.maxDate = new Date();
    $scope.word = /^([A-Z|a-z|0-9]+\s{0,1}[A-Z|a-z|0-9]*)*$/;
    $scope.events = [];
    $scope.predicate = 'start';
    $scope.virtualDel = '';
    /**Setup [E]**/
    
    /**Check availability[S]**/
    $scope.userInfoAllow = function(value){
    	var permission = ["","E","C","A"];
    	var ternary = value.toString(3);
    	
    	var permissionCnt = 0;
    	var action = "";
    	for(var i=ternary.length-1; i >= 0; i--){
    		var charPos = ternary.charAt(i);
    		if( charPos == 1){
    			action += permission[permissionCnt] + ",";
    		}else if(charPos == 2){
    			action += permission[permissionCnt] + "[Opt],";
    		}
    		permissionCnt++;
    	}
    	return action == "" ? "":action.substring(0,action.length-1);
    }
    /**Check availability[E]**/
    
	/**Refilter the search[S]**/
	$scope.filterSearch = function(){
		if($scope.endD != undefined && $scope.startD != undefined){
			$scope.endD.setMinutes(0, 0, 0);
			$scope.endD.setHours(24);
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
			var confFunc = function(data){
				$scope.events = data;
				$scope.groupEvents = _.groupBy($scope.events, function(num){ var d = new Date(num.start); var date = (new Date(d.getFullYear(), d.getMonth(), 1, 0, 0, 0, 0)); return date.getTime();});
			};
			getHTTP($http, calSetupConfURL+"/0/0", confFunc);
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
	$scope.showAlert = function(ev, message) {
		$mdDialog.show(
			$mdDialog.alert()
			.title('Opps, Error Encountered')
			.content(message)
			.ariaLabel('Error')
			.ok('Ok')
			.targetEvent(ev)
		);
	};
	
	$scope.showOK = function(ev) {
		$location.url('eventempty');
	};
	/**DialogBox[E]**/
    	      
	function setupData(){
    	return $scope.events;
	}
    
    /**Setup confirmation [S]**/
	$scope.rejectForm = function(ev){

		var confirm = $mdDialog.confirm()
			.title('Reject All Events')
			.content('Are you sure to remove all your calendar setup?')
			.ariaLabel('Reject Form')
			.ok('Reject')
			.cancel('No')
			.targetEvent(ev);
		$mdDialog.show(confirm).then(function() {
				var succFunc = function(data){
					$scope.flag = false;
					$scope.showOK(ev);
				}
				var failFunc = function(data){
					$scope.flag = false;
					$scope.showAlert(ev, "System encountered Exception. Please try again.");
				}
				var errFunc = function(data){
					$scope.flag = false;
					$scope.showAlert(ev, "System encountered Exception. Please try again.");
				}

				funcHTTP($http, "DELETE", calSetupConfURL, {}, succFunc, failFunc, errFunc);
			}, function() {
		});
	}
    
	$scope.resetForm = function(ev){
		$scope.startD = undefined;
		$scope.endD = undefined;
		var confirm = $mdDialog.confirm()
			.title('Reset Form')
			.content('Are you sure to reset all your changes?')
			.ariaLabel('Reset Form')
			.ok('Reset')
			.cancel('No')
			.targetEvent(ev);
		$mdDialog.show(confirm).then(function() {
			$scope.filterSearch();
		}, function() {
		});
	}

	$scope.processForm = function(ev){
		if ($scope.flag) {
	        return;
	    }
		
		if ($scope.setup.$valid == false){
			$scope.flag = false;
			$scope.showAlert(ev,'Please check for errors.');
			return;
		}
		
	    $scope.flag = true;
	    
	    $scope.formData = setupData();
    	
	    var succFunc = function(data){
	    	$scope.flag = false;
	    	$scope.showOK(ev);
	    }
	    var failFunc = function(data){
	        $scope.flag = false;
	        $scope.showAlert(ev,'Please check for errors.');
	    }
	    var errFunc = function(data){
	    	$scope.flag = false;
	    }
	    funcHTTP($http, "POST", calSetupConfURL, $scope.formData, succFunc, failFunc, errFunc);
	}
	/**Setup confirmation [E]**/
	  
	function obtainDate(date, opt){
		if(opt==1)
			return moment(date).format("MMM Do, YYYY");
		if(opt==2)
			return moment(date).format("MMM, YYYY");
	}
		
	function obtainTime(time){
		return moment(time).format("HHmm");
	}
})
.controller('StatisticCtrl', function($scope) {
	$scope.list1 = {title: 'AngularJS - Drag Me'};
	$scope.list2 = {title: 'AngularJS 2 - Drag Me'};
	$scope.list3 = {title: 'AngularJS 3 - Drag Me'};
		
	  $scope.startCallback = function(event, ui) {};
	                
	  $scope.stopCallback = function(event, ui) {};

	  $scope.dragCallback = function(event, ui) {};

	  $scope.dropCallback = function(event, ui) {};

	  $scope.overCallback = function(event, ui) {};

	  $scope.outCallback = function(event, ui) {
	  };
})
.controller('SettingsCtrl', function($scope, $http, $location, $route, $mdDialog) {
	$scope.url_pattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
	$scope.ctcNo_pattern = /^\+?[0-9]{0,13}$/;

	$scope.returnUser = function(){console.log("OO");}
	
	$scope.profileSucc = function(data){
		$scope.cName = data.cName;
		$scope.cDesc = data.cDesc;
		$scope.cWebsite = data.cWebsite;
		$scope.cCtcNo = data.cCtcNo;
		$scope.cEmail = data.cEmail;
		$scope.ver = data.ver;
	};
	
	$scope.reportSucc = function(data){
		if(data.success != "ok"){
			$scope.rEmail = data.email;
		}
    };
    
    getHTTP($http,subsReportURL, $scope.reportSucc);
    getHTTP($http,adminProfileUrl, $scope.profileSucc);

	
	function createProfileJSON($scope){
		return {
			cDesc: $scope.setting.profile.cDesc.$viewValue,
			cWebsite: $scope.setting.profile.cWebsite.$viewValue,
			cCtcNo: $scope.setting.profile.cCtcNo.$viewValue,
			cEmail: $scope.setting.profile.cEmail.$viewValue,
			ver: $scope.ver
		}
	}
	
	$scope.showAlert = function(ev, message){
		$mdDialog.show(
			$mdDialog.alert()
		    .title('Error')
		    .content(message)
		    .ariaLabel('There is input error, please check.')
		    .ok('Ok!')
		    .targetEvent(ev)
		);
	}
	
	$scope.showUpdate = function(ev){
		$mdDialog.show(
			$mdDialog.alert()
			    .title('Updated')
			    .content("Update Completed")
			    .ariaLabel('Update Completed')
			    .ok('Ok!')
			    .targetEvent(ev)
			);
	}
	
	$scope.resetProfileForm = function(){
		$route.reload();
	}
	
	/**Save CP profile[S]**/
	$scope.processProfileForm = function(ev) {
		
		if ($scope.profileFlag || $scope.setting.profile.$valid==false)
			return;

		$scope.profileFlag = true;
		
		$scope.formData = createProfileJSON($scope);
		$scope.errors = undefined;

		var succFunc = function(data){
			$scope.profileFlag = false;
			$scope.showUpdate(ev);
			$route.reload();
			}
	    var failFunc = function(data){
	    	$scope.profileFlag = false;
	    	$scope.showAlert(ev,"There are errors to the update.");
	    	$scope.profileErrors = data.errors;
	    	}
	    var errFunc = function(data){
	    	$scope.profileFlag = false;
	    	$scope.showAlert(ev,"There are errors to the update.");
	    	$scope.profileErrors = data.errors;
	   		}
	    
	    funcHTTP($http, "POST", adminProfileUrl, $scope.formData, succFunc, failFunc, errFunc);
	};
	/**Save CP profile[E]**/
	
	/**Save report profile[E]**/
	function saveReport($scope){
		var jsonVal = {
			email: $scope.setting.report.rEmail.$viewValue
		};
		
		return jsonVal;
	}

	$scope.processReportForm = function(ev){
		
		if ($scope.reportFlag || $scope.setting.report.$valid == false){
			return;
		}

		$scope.reportFlag = true;
		$scope.formData = saveReport($scope);
		
		var succFunc = function(data){
			$scope.reportFlag = false;
			$scope.showUpdate(ev);
			}
	    var failFunc = function(data){
	    	$scope.reportFlag = false;
	    	$scope.showAlert(ev,"There are errors to the update.");
	    	$scope.reportErrors = data.errors;
	    	}
	    var errFunc = function(data){
	    	$scope.reportFlag = false;
	    	$scope.showAlert(ev,"There are errors to the update.");
	    	$scope.reportErrors = data.errors;
	   		}
	    
	    funcHTTP($http, "POST", subsReportURL, $scope.formData, succFunc, failFunc, errFunc);
	}
	/**Save report profile[E]**/
});